import { LucideProps } from 'lucide-react';

export type ViewModeSwitcherBtnProps = {
    mode: ViewingMode;
    width?: number;
    Icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;
};
export type ViewingMode = 'editor' | 'preview' | 'split-view';
