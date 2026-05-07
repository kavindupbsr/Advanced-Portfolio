import NextImage, { type ImageProps as NextImageProps } from 'next/image';

export function Image(props: NextImageProps) {
  return <NextImage {...props} />;
}
