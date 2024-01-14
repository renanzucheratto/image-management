interface Keywords {
  id: number;
  label: string;
}

interface File {
  fileName: string;
  base64: string;
}

interface ImageDb {
  id?: number;
  price: number;
  title: string;
  description: string;
  file: File;
  keywords: Keywords[];
  createdAt: string;
}

export type { ImageDb, Keywords, File }