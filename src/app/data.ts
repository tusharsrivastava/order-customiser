import { RecordType } from "@/core/types";

export const shoeRecord: RecordType = {
    bases: [{
      id: "1",
      label: "Shoe",
      imageSrc: "",
    }],
    variants: [{
      id: "1",
      label: "Shoe Black",
      data: {
        laces: '#222222',
        mesh: '#222222',
        caps: '#222222',
        inner: '#222222',
        sole: '#222222',
        stripes: '#222222',
        band: '#222222',
        patch: '#222222',
      },
      imageSrc: ""
    },
    {
      id: "2",
      label: "Shoe White",
      data: {
        laces: '#FFFFFF',
        mesh: '#FFFFFF',
        caps: '#FFFFFF',
        inner: '#FFFFFF',
        sole: '#FFFFFF',
        stripes: '#FFFFFF',
        band: '#FFFFFF',
        patch: '#FFFFFF',
      },
      imageSrc: ""
    }],
    selectedBase: '',
    selectedVariant: ''
};
