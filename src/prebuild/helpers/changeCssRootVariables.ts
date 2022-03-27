import { Theme } from 'app/enum/Theme';

export function changeCssRootVariables(theme: Theme) {
  const root = document.querySelector(':root') as HTMLElement;

  const components = [
    'body-background',
    'component-background',
    'dayCard-background',
    'text-color',
    'dayCard-boxShadow'
  ];

  for (let i = 0; i < components.length; i++) {
    root.style.setProperty(
      `--${components[i]}-default`,
      `var(--${components[i]}-${theme})`
    );
  }
}