import { useState } from "react";
import { Button } from "@/components/ui/button";
import SacredBackground from "@/components/SacredBackground";
import ShlokaCard from "@/components/ShlokaCard";
import { 
  getRandomShloka, 
  getShlokaByChapterAndVerse,
  getChapters,
  getVersesForChapter,
  Shloka 
} from "@/data/shlokas";
import { Sparkles, BookOpen, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

type View = "home" | "chapters" | "chapter" | "verse";

const Index = () => {
  const [currentShloka, setCurrentShloka] = useState<Shloka | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [view, setView] = useState<View>("home");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const handleGetShloka = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentShloka(getRandomShloka());
      setIsAnimating(false);
      setView("verse");
    }, 300);
  };

  const handleBrowseChapters = () => {
    setView("chapters");
    setCurrentShloka(null);
  };

  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);
    setView("chapter");
  };

  const handleVerseSelect = (chapter: number, verse: number) => {
    const shloka = getShlokaByChapterAndVerse(chapter, verse);
    if (shloka) {
      setCurrentShloka(shloka);
      setView("verse");
    }
  };

  const handleBackToHome = () => {
    setView("home");
    setCurrentShloka(null);
    setSelectedChapter(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <SacredBackground />
      
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4 animate-float">
          Bhagavad Gita
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light">
          Divine Wisdom of the Eternal
        </p>
        <div className="mt-4 text-4xl animate-glow">ॐ</div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-8 z-10">
        {/* View: Verse (showing a shloka) */}
        {view === "verse" && currentShloka && (
          <>
            <ShlokaCard shloka={currentShloka} />
            <div className="flex gap-4">
              <Button
                onClick={handleGetShloka}
                size="lg"
                className={`
                  group relative overflow-hidden
                  bg-gradient-to-r from-primary via-secondary to-accent
                  hover:scale-105 transition-all duration-300
                  text-primary-foreground font-semibold text-lg
                  px-8 py-6 rounded-full shadow-2xl
                  ${isAnimating ? 'scale-95 opacity-50' : ''}
                `}
                disabled={isAnimating}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Get Another Shloka
                  <Sparkles className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
              <Button
                onClick={handleBackToHome}
                variant="outline"
                size="lg"
                className="px-8 py-6 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </div>
          </>
        )}

        {/* View: Home */}
        {view === "home" && (
          <>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button
                onClick={handleGetShloka}
                size="lg"
                className={`
                  group relative overflow-hidden
                  bg-gradient-to-r from-primary via-secondary to-accent
                  hover:scale-105 transition-all duration-300
                  text-primary-foreground font-semibold text-lg
                  px-8 py-6 rounded-full shadow-2xl
                  ${isAnimating ? 'scale-95 opacity-50' : ''}
                `}
                disabled={isAnimating}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Random Verse
                  <Sparkles className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
              <Button
                onClick={handleBrowseChapters}
                size="lg"
                variant="outline"
                className="
                  group relative overflow-hidden
                  hover:scale-105 transition-all duration-300
                  font-semibold text-lg
                  px-8 py-6 rounded-full shadow-2xl
                  border-2
                "
              >
                <span className="relative z-10 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Browse Chapters
                </span>
              </Button>
            </div>
            {!currentShloka && (
              <p className="text-muted-foreground text-center max-w-md animate-fade-in">
                Click the button above to receive a sacred verse from the Bhagavad Gita along with its profound meaning and wisdom
              </p>
            )}
          </>
        )}

        {/* View: Chapters List */}
        {view === "chapters" && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Select a Chapter
              </h2>
              <Button
                onClick={handleBackToHome}
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-4">
              {getChapters().map((chapter) => (
                <Button
                  key={chapter}
                  onClick={() => handleChapterSelect(chapter)}
                  className="
                    aspect-square text-2xl font-bold
                    hover:scale-110 transition-all duration-300
                    rounded-lg shadow-lg
                  "
                  variant="outline"
                >
                  {chapter}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* View: Chapter Detail (verses list) */}
        {view === "chapter" && selectedChapter !== null && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Chapter {selectedChapter}
              </h2>
              <Button
                onClick={() => setView("chapters")}
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Chapters
              </Button>
            </div>
            <Card className="p-6 bg-card/80 backdrop-blur-sm">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {getVersesForChapter(selectedChapter).map((verse) => (
                  <Button
                    key={verse}
                    onClick={() => handleVerseSelect(selectedChapter, verse)}
                    className="
                      aspect-square text-sm font-semibold
                      hover:scale-110 transition-all duration-300
                      rounded-lg
                    "
                    variant="outline"
                  >
                    {verse}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center text-muted-foreground/60 text-sm">
        <p>श्रीमद्भगवद्गीता | Srimad Bhagavad Gita</p>
      </div>
    </div>
  );
};

export default Index;
