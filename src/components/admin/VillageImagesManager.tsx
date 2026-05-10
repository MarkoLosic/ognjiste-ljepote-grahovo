import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin, Save } from "lucide-react";
import { OTHER_VILLAGE_NAMES } from "@/data/otherVillageNames";

interface GalleryOption {
  id: string;
  image_url: string;
  title: string | null;
}

export function VillageImagesManager() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryOption[]>([]);
  const [mapping, setMapping] = useState<Record<string, string | null>>({});

  useEffect(() => {
    void load();
  }, []);

  const load = async () => {
    setLoading(true);
    const [g, v] = await Promise.all([
      supabase
        .from("gallery_images")
        .select("id, image_url, title")
        .order("created_at", { ascending: false }),
      supabase.from("village_images").select("village_name, gallery_image_id"),
    ]);
    if (g.error) {
      toast({ title: "Greška", description: g.error.message, variant: "destructive" });
    } else {
      setGallery((g.data ?? []) as GalleryOption[]);
    }
    if (v.error) {
      toast({ title: "Greška", description: v.error.message, variant: "destructive" });
    } else {
      const map: Record<string, string | null> = {};
      for (const row of v.data ?? []) {
        map[row.village_name] = row.gallery_image_id;
      }
      setMapping(map);
    }
    setLoading(false);
  };

  const handleChange = (village: string, value: string) => {
    setMapping((m) => ({ ...m, [village]: value === "" ? null : value }));
  };

  const handleSave = async (village: string) => {
    setSaving(village);
    const gallery_image_id = mapping[village] ?? null;
    const { error } = await supabase
      .from("village_images")
      .upsert(
        { village_name: village, gallery_image_id },
        { onConflict: "village_name" }
      );
    setSaving(null);
    if (error) {
      toast({ title: "Greška pri spremanju", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Spremljeno", description: `Slika za "${village}" je ažurirana.` });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Slike za ostala sela
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Povežite naselja sa slikama iz galerije. Slike se prikazuju na stranici
          "Ostala sela". Slika mora prvo biti dodana u Galeriju.
        </p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : gallery.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Nema slika u galeriji. Prvo dodajte slike u Galeriju.
          </p>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {OTHER_VILLAGE_NAMES.map((village) => {
              const currentId = mapping[village] ?? "";
              const current = gallery.find((g) => g.id === currentId);
              return (
                <div
                  key={village}
                  className="flex gap-3 items-center p-3 bg-muted/40 rounded-lg border border-border/50"
                >
                  <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    {current ? (
                      <img
                        src={current.image_url}
                        alt={village}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        nema
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{village}</p>
                    <select
                      value={currentId}
                      onChange={(e) => handleChange(village, e.target.value)}
                      className="mt-1 w-full text-sm bg-background border border-input rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">— bez slike —</option>
                      {gallery.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.title || g.image_url.split("/").pop() || g.id.slice(0, 8)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleSave(village)}
                    disabled={saving === village}
                    className="flex-shrink-0"
                  >
                    {saving === village ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-1" />
                        Spremi
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default VillageImagesManager;
