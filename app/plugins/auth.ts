export default defineNuxtPlugin(() => {
  const { registerWithEmailAndPassword, loginWithEmailAndPassword, loginWithGoogle } = useAuth();

  return {
    provide: {
      registerWithEmailAndPassword,
      loginWithEmailAndPassword,
      loginWithGoogle,
    },
  };
});
