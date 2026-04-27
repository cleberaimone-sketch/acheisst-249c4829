import { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  profileId: string;
}

interface Specialty {
  id: string;
  specialty: string;
}

const MAX_LEN = 50;
const MAX_COUNT = 20;

const SpecialtiesEditor = ({ profileId }: Props) => {
  const [items, setItems] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!profileId) return;
    (async () => {
      const { data, error } = await supabase
        .from("professional_specialties")
        .select("id, specialty")
        .eq("profile_id", profileId)
        .order("created_at", { ascending: true });
      if (!error && data) setItems(data);
      setLoading(false);
    })();
  }, [profileId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;
    if (value.length > MAX_LEN) {
      toast.error(`Máximo ${MAX_LEN} caracteres`);
      return;
    }
    if (items.length >= MAX_COUNT) {
      toast.error(`Máximo ${MAX_COUNT} especialidades`);
      return;
    }
    if (items.some((i) => i.specialty.toLowerCase() === value.toLowerCase())) {
      toast.error("Especialidade já adicionada");
      return;
    }
    setAdding(true);
    const { data, error } = await supabase
      .from("professional_specialties")
      .insert({ profile_id: profileId, specialty: value })
      .select("id, specialty")
      .single();
    setAdding(false);
    if (error || !data) {
      toast.error("Erro ao adicionar");
      return;
    }
    setItems([...items, data]);
    setInput("");
  };

  const handleRemove = async (id: string) => {
    const prev = items;
    setItems(items.filter((i) => i.id !== id));
    const { error } = await supabase
      .from("professional_specialties")
      .delete()
      .eq("id", id);
    if (error) {
      setItems(prev);
      toast.error("Erro ao remover");
    }
  };

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8 shadow-card">
      <h2 className="font-display text-lg font-bold text-foreground mb-1">Especialidades</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Adicione áreas de atuação (ex: PCMSO, PPRA, Medicina do Trabalho).
      </p>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={MAX_LEN}
          placeholder="Nova especialidade"
          className="flex-1 border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
        />
        <button
          type="submit"
          disabled={adding || !input.trim()}
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-60"
        >
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Adicionar
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma especialidade ainda.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((s) => (
            <span
              key={s.id}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium"
            >
              {s.specialty}
              <button
                type="button"
                onClick={() => handleRemove(s.id)}
                className="hover:text-destructive transition-colors"
                aria-label={`Remover ${s.specialty}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialtiesEditor;
