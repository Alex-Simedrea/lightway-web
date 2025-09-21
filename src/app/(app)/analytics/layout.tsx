export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className='overflow-auto rounded-3xl bg-neutral-100 p-10'
      style={{
        height: 'calc(100dvh - 1.25rem)'
      }}
    >
      {children}
    </main>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 6cffb3c18f0495baebaae2967af472144a7fd67c
