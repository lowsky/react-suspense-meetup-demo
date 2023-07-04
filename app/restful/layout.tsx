import React from 'react';
import DirectorLayout from 'components/DirectorLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DirectorLayout>{children}</DirectorLayout>;
}
