import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Exhibit } from "@/types/museum";

interface ExhibitModalProps {
  exhibit: Exhibit | null;
  open: boolean;
  onClose: () => void;
}

const ExhibitModal = ({ exhibit, open, onClose }: ExhibitModalProps) => {
  if (!exhibit) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{exhibit.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img 
            src={exhibit.imageUrl} 
            alt={exhibit.name} 
            className="w-full aspect-video rounded-xl object-cover"
          />
          <p className="text-muted-foreground leading-relaxed">{exhibit.description}</p>
          <div className="flex flex-wrap gap-2">
            {exhibit.period && (
              <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Period: {exhibit.period}
              </span>
            )}
            {exhibit.origin && (
              <span className="px-3 py-1.5 bg-gold/10 text-gold rounded-full text-sm font-medium">
                Origin: {exhibit.origin}
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExhibitModal;
