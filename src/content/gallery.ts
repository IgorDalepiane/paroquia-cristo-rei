export type GalleryItem = {
  id: string;
  title: string;
  category: "matriz" | "comunidade" | "celebracao";
  aspect: "landscape" | "portrait" | "square";
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Igreja matriz — fachada",
    category: "matriz",
    aspect: "landscape",
  },
  {
    id: "g2",
    title: "Interior da matriz",
    category: "matriz",
    aspect: "portrait",
  },
  {
    id: "g3",
    title: "Celebração dominical",
    category: "celebracao",
    aspect: "landscape",
  },
  {
    id: "g4",
    title: "Comunidade em oração",
    category: "comunidade",
    aspect: "square",
  },
  {
    id: "g5",
    title: "Encontro pastoral",
    category: "celebracao",
    aspect: "landscape",
  },
  {
    id: "g6",
    title: "Capela comunitária",
    category: "comunidade",
    aspect: "portrait",
  },
  { id: "g7", title: "Procissão", category: "celebracao", aspect: "landscape" },
  {
    id: "g8",
    title: "Grupo de jovens",
    category: "comunidade",
    aspect: "square",
  },
];

export const galleryCategoryLabels: Record<GalleryItem["category"], string> = {
  matriz: "Matriz",
  comunidade: "Comunidades",
  celebracao: "Celebrações",
};
