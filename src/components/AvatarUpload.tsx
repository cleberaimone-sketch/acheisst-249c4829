import { useRef, useState } from "react";
import { Camera, Loader2, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AvatarUploadProps {
  userId: string;
  currentUrl: string | null;
  displayName: string | null;
  onChange: (url: string | null) => void;
}

const MAX_BYTES = 3 * 1024 * 1024; // 3MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

const AvatarUpload = ({ userId, currentUrl, displayName, onChange }: AvatarUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const initials = (displayName ?? "?")
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleFile = async (file: File) => {
    if (!ALLOWED.includes(file.type)) {
      toast.error("Use JPG, PNG ou WebP");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("Arquivo muito grande (máx 3MB)");
      return;
    }
    setBusy(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${userId}/avatar-${Date.now()}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (upErr) {
      setBusy(false);
      toast.error("Erro ao enviar: " + upErr.message);
      return;
    }

    const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = pub.publicUrl;

    const { error: dbErr } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("user_id", userId);

    setBusy(false);
    if (dbErr) {
      toast.error("Erro ao salvar: " + dbErr.message);
      return;
    }
    onChange(publicUrl);
    toast.success("Foto atualizada!");
  };

  const handleRemove = async () => {
    if (!currentUrl) return;
    setBusy(true);
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: null })
      .eq("user_id", userId);
    setBusy(false);
    if (error) {
      toast.error("Erro ao remover");
      return;
    }
    onChange(null);
    toast.success("Foto removida");
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20 border border-border">
        <AvatarImage src={currentUrl ?? undefined} alt={displayName ?? "Avatar"} />
        <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-full px-4 py-2 hover:bg-muted transition-colors disabled:opacity-60"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
          {currentUrl ? "Trocar foto" : "Enviar foto"}
        </button>
        {currentUrl && (
          <button
            type="button"
            disabled={busy}
            onClick={handleRemove}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Remover
          </button>
        )}
        <p className="text-[11px] text-muted-foreground">JPG/PNG/WebP, até 3MB</p>
      </div>
    </div>
  );
};

export default AvatarUpload;
