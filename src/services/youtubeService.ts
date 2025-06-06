
interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
  };
}

interface YouTubeVideo {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
}

export class YouTubeService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getUserPlaylists(): Promise<YouTubePlaylist[]> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=25&access_token=${this.accessToken}`
      );
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки плейлистов');
      }
      
      const data = await response.json();
      
      return data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails
      }));
    } catch (error) {
      console.error('Ошибка получения плейлистов:', error);
      throw error;
    }
  }

  async getPlaylistVideos(playlistId: string): Promise<YouTubeVideo[]> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&access_token=${this.accessToken}`
      );
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки видео из плейлиста');
      }
      
      const data = await response.json();
      
      return data.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        artist: item.snippet.videoOwnerChannelTitle || 'Неизвестный исполнитель',
        thumbnail: item.snippet.thumbnails?.medium?.url || '',
        duration: '3:30' // YouTube API v3 требует отдельного запроса для длительности
      }));
    } catch (error) {
      console.error('Ошибка получения видео плейлиста:', error);
      throw error;
    }
  }

  async searchMusic(query: string, maxResults: number = 25): Promise<YouTubeVideo[]> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&maxResults=${maxResults}&access_token=${this.accessToken}`
      );
      
      if (!response.ok) {
        throw new Error('Ошибка поиска музыки');
      }
      
      const data = await response.json();
      
      return data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails?.medium?.url || '',
        duration: '3:30'
      }));
    } catch (error) {
      console.error('Ошибка поиска музыки:', error);
      throw error;
    }
  }
}
