"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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

          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Email" required />
            </div>

            <div className={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
