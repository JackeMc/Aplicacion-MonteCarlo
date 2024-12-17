// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Aquí se apilan las pantallas */}
    </Stack>
  );
};

export default Layout;
