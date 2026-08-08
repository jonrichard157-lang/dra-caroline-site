import consultorioImg from "../assets/images/dra-caroline-consultorio.jpg";
import explicandoImg from "../assets/images/dra-caroline-explicando.jpg";
import jalecoImg from "../assets/images/dra-caroline-jaleco.jpg";
import janelaImg from "../assets/images/dra-caroline-janela.jpg";

export interface SiteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// As dimensões abaixo refletem as fotos originais enviadas e evitam
// mudanças de layout durante o carregamento (CLS).
export const heroImage: SiteImage = {
  src: jalecoImg,
  alt: "Dra. Caroline de Lima Floriano, cirurgiã-dentista, sorrindo no consultório",
  width: 1066,
  height: 1600,
};

export const aboutImage: SiteImage = {
  src: explicandoImg,
  alt: "Dra. Caroline de Lima Floriano explicando um procedimento com um modelo odontológico",
  width: 1066,
  height: 1600,
};

export const officeImage: SiteImage = {
  src: consultorioImg,
  alt: "Dra. Caroline de Lima Floriano organizando materiais de estudo no consultório",
  width: 1066,
  height: 1600,
};

export const trustImage: SiteImage = {
  src: janelaImg,
  alt: "Dra. Caroline de Lima Floriano no consultório, ambiente claro e acolhedor",
  width: 1066,
  height: 1600,
};
