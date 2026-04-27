"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserContext } from "@/context/UserContext";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const { login } = useUserContext();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      login(email);
      router.push("/users");
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Side: Illustration */}
      <section className={styles.illustrationSection}>
        <div className={styles.logo}>
          <Image src="assets/logo.svg" alt="Lendsqr" width={140} height={36} />
        </div>
        <div className={styles.heroImage}>
          <Image
            src="assets/sign-in-vector.svg"
            alt="Sign in illustration"
            width={600}
            height={400}
          />
        </div>
      </section>

      {/* Right Side: Form */}
      <section className={styles.formSection}>
        <div className={styles.loginBox}>
          <h1>Welcome.</h1>
          <p>Enter details to login.</p>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="new-password"
                required
              />
              <span
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>

            <a href="#" className={styles.forgotPassword}>
              FORGOT PASSWORD?
            </a>

            <button type="submit" className={styles.loginButton}>
              LOG IN
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
