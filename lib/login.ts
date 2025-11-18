import pb from "@/lib/pocketbase";

async function login(email: string, password: string) {
  try {
    // Authenticate with email and password
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    // Store the authentication token in cookies for SSR compatibility
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });

    console.log("Login successful:", authData);
  } catch (error) {
    console.error("Error during login:", error);
  }
}
