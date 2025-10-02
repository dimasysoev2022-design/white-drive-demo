import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Clock, 
  Eye,
  Star,
  X,
  Volume2,
  Maximize,
  SkipBack,
  SkipForward
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  thumbnailUrl?: string; // optional direct image url for cover
  category: 'overview' | 'technical' | 'guide' | 'webinar';
  views: number;
  featured: boolean;
  embedUrl?: string;
}

export const VideoTab = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const videos: Video[] = [
    {
      id: "video-001",
      title: "Ваш первый шаг в майнинг вместе с White",
      description: "Короткое знакомство: что такое демо-режим, зачем мы его сделали и как работает наше сообщество. Вы увидите, что в майнинг можно заходить безопасно и прозрачно — даже без опыта.",
      duration: "3:40",
      thumbnail: "overview",
      thumbnailUrl: "https://drive.google.com/thumbnail?id=1N6igDcl7E36bmdh_yWYWujHoOeRYe_Qh&sz=w1200",
      category: "overview",
      views: 1247,
      featured: true,
      embedUrl: "https://drive.google.com/file/d/1N6igDcl7E36bmdh_yWYWujHoOeRYe_Qh/preview"
    },
    {
      id: "video-002", 
      title: "White: люди, миссия, опыт",
      description: "Расскажем, кто стоит за проектом, какой у нас опыт в крипте и почему появился продукт White. Вы узнаете, что для нас это не просто бизнес, а сообщество и ценность, которую мы создаём для клиентов.",
      duration: "6:32",
      thumbnail: "overview",
      category: "overview", 
      views: 892,
      featured: false
    },
    {
      id: "video-003",
      title: "Навигация по личному кабинету",
      description: "Пошаговый разбор интерфейса: где смотреть доходность, как управлять асиком, где хранится отчётность и как работает система начислений. Всё просто и прозрачно.",
      duration: "8:45",
      thumbnail: "guide",
      category: "guide",
      views: 756,
      featured: true
    },
    {
      id: "video-004",
      title: "Почему майнинг выгоднее привычных инвестиций",
      description: "Объясним, чем майнинг в White отличается от вкладов, недвижимости или просто покупки биткоина. Сравним по доходности, рискам и удобству.",
      duration: "12:20",
      thumbnail: "webinar", 
      category: "webinar",
      views: 2134,
      featured: false
    },
    {
      id: "video-005",
      title: "Всё под ключ и без лишних рисков",
      description: "Финальное видео, где мы объясняем, почему работа с White — это легальность, стабильность и доход в биткоине без головной боли. Здесь вы поймёте, почему нас выбирают клиенты.",
      duration: "7:55",
      thumbnail: "technical",
      category: "technical",
      views: 1456,
      featured: false
    }
  ];

  const categories = [
    { id: 'overview', name: 'Обзор', count: 2 },
    { id: 'technical', name: 'Техническое', count: 1 },
    { id: 'guide', name: 'Руководства', count: 1 },
    { id: 'webinar', name: 'Вебинары', count: 1 }
  ];

  const filteredVideos = videos.filter(video => 
    !selectedCategory || video.category === selectedCategory
  );

  const featuredVideos = videos.filter(video => video.featured);

  const getThumbnailGradient = (thumbnail: string) => {
    switch (thumbnail) {
      case 'overview': return 'from-blue-500 to-purple-600';
      case 'technical': return 'from-green-500 to-teal-600';  
      case 'guide': return 'from-orange-500 to-red-600';
      case 'webinar': return 'from-purple-500 to-pink-600';
      default: return 'from-primary to-accent';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'overview': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'technical': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'guide': return 'bg-orange-500/10 text-orange-500 border-orange-500/20'; 
      case 'webinar': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const playVideo = (video: Video) => {
    setSelectedVideo(video);
    // In real app, would track analytics: td_play_video_${video.id}
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gradient">Видео-гайды</h2>
        <p className="text-muted-foreground">
          Обучающие материалы и презентации WHITE
        </p>
      </div>

      {/* Featured Videos */}
      {featuredVideos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Star className="w-5 h-5 mr-2 text-primary" />
            Рекомендуем посмотреть
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredVideos.map(video => (
              <Card key={video.id} className="card-elevated transition-smooth hover:glow cursor-pointer group">
                <div className="relative aspect-video rounded-t-lg overflow-hidden bg-muted">
                  {video.thumbnailUrl ? (
                    <img src={video.thumbnailUrl} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${getThumbnailGradient(video.thumbnail)} opacity-80`} />
                  )}
                  {!video.embedUrl && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-black/70 text-white border-white/10">
                        Скоро
                      </Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="rounded-full w-16 h-16 opacity-80 group-hover:opacity-100 transition-fast"
                      onClick={() => playVideo(video)}
                    >
                      <Play className="w-6 h-6 ml-1" />
                    </Button>
                  </div>
              <div className="absolute bottom-2 right-2">
                    <Badge className="bg-black/60 text-white border-none">
                      {video.duration}
                    </Badge>
                  </div>
                  {video.featured && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Топ
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base line-clamp-2">
                    {video.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm line-clamp-2 mb-3">
                    {video.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getCategoryColor(video.category)}>
                      {categories.find(c => c.id === video.category)?.name}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Eye className="w-3 h-3 mr-1" />
                      {video.views.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          Все видео ({videos.length})
        </Button>
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      {/* All Videos Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Все видео</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredVideos.map(video => (
              <Card key={video.id} className="card-elevated transition-smooth hover:glow cursor-pointer group">
              <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                {video.thumbnailUrl ? (
                  <img src={video.thumbnailUrl} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${getThumbnailGradient(video.thumbnail)} opacity-60`} />
                )}
                {!video.embedUrl && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-black/70 text-white border-white/10 text-xs">
                      Скоро
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    size="sm" 
                    className="rounded-full w-12 h-12 opacity-60 group-hover:opacity-100 transition-fast"
                    onClick={() => playVideo(video)}
                  >
                    <Play className="w-4 h-4 ml-0.5" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm line-clamp-2">
                  {video.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs line-clamp-2 mb-2">
                  {video.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Eye className="w-3 h-3 mr-1" />
                    {video.views > 1000 ? `${(video.views / 1000).toFixed(1)}k` : video.views}
                  </div>
                  {video.featured && (
                    <Star className="w-3 h-3 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative">
            {/* Real Player if embedUrl is provided, else mock */}
            {selectedVideo?.embedUrl ? (
              <div className="aspect-video bg-black relative overflow-hidden rounded-t-lg">
                <iframe
                  src={selectedVideo.embedUrl}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full"
                />
                {/* Реальное видео — без оверлея "Скоро" */}
                {/* Удалено дублирующее закрытие. Встроенная кнопка — в DialogContent. */}
              </div>
            ) : (
              <div className="aspect-video bg-black relative overflow-hidden rounded-t-lg">
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedVideo ? getThumbnailGradient(selectedVideo.thumbnail) : 'from-primary to-accent'} opacity-40`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <p className="text-lg font-medium">
                      {selectedVideo?.title}
                    </p>
                    <Badge className="bg-black/60 text-white">
                      Демо-версия плеера
                    </Badge>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center space-x-4 text-white">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 h-1 bg-white/30 rounded">
                      <div className="w-1/3 h-full bg-primary rounded" />
                    </div>
                    <span className="text-sm">1:15 / {selectedVideo?.duration}</span>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {/* Удалено дублирующее закрытие. Встроенная кнопка — в DialogContent. */}
              </div>
            )}

            {/* Video Info */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{selectedVideo?.title}</h3>
                <p className="text-muted-foreground">{selectedVideo?.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className={selectedVideo ? getCategoryColor(selectedVideo.category) : ''}>
                    {selectedVideo && categories.find(c => c.id === selectedVideo.category)?.name}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="w-4 h-4 mr-1" />
                    {selectedVideo?.views.toLocaleString()} просмотров
                  </div>
                </div>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {selectedVideo?.duration}
                </Badge>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};