import { Shloka } from "@/data/shlokas";
import { Card } from "@/components/ui/card";

interface ShlokaCardProps {
  shloka: Shloka | null;
}

export default function ShlokaCard({ shloka }: ShlokaCardProps) {
  if (!shloka) return null;

  return (
    <Card className="w-full max-w-4xl p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/30 shadow-2xl animate-fade-in">
      {/* Chapter and Verse */}
      <div className="text-center mb-6">
        <p className="text-accent font-semibold text-lg">
          Chapter {shloka.chapter}, Verse {shloka.verse}
        </p>
      </div>

      {/* Sanskrit Text */}
      <div className="mb-8 text-center">
        <p className="text-3xl md:text-4xl font-serif text-primary leading-relaxed mb-4">
          {shloka.sanskrit}
        </p>
      </div>

      {/* Transliteration */}
      <div className="mb-6 text-center">
        <p className="text-lg italic text-muted-foreground leading-relaxed">
          {shloka.transliteration}
        </p>
      </div>

      {/* Divider */}
      <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto my-8" />

      {/* Translation */}
      <div className="mb-6">
        <h3 className="text-secondary font-semibold text-xl mb-3">Translation:</h3>
        <p className="text-foreground leading-relaxed text-lg">
          {shloka.translation}
        </p>
      </div>

      {/* Explanation */}
      <div>
        <h3 className="text-secondary font-semibold text-xl mb-3">Explanation:</h3>
        <p className="text-muted-foreground leading-relaxed text-base">
          {shloka.explanation}
        </p>
      </div>

      {/* Decorative Om Symbol */}
      <div className="mt-8 text-center">
        <p className="text-5xl text-primary/20 animate-glow">ॐ</p>
      </div>
    </Card>
  );
}
