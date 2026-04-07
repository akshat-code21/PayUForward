/**
 * Family names must match keys passed to `useFonts` in `app/_layout.tsx`.
 * On React Native, each weight is a separate file — use `fontWeight: '400'` with the matching face.
 */
export const BRICOLAGE = {
  regular: 'BricolageGrotesque_400Regular',
  medium: 'BricolageGrotesque_500Medium',
  semiBold: 'BricolageGrotesque_600SemiBold',
  bold: 'BricolageGrotesque_700Bold',
  extraBold: 'BricolageGrotesque_800ExtraBold',
} as const;
