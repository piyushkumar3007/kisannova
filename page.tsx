"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Heritage = {
  id: number;
  name: string;
  slug: string;
  type: string;
  description: string;
  state: string;
  district?: string | null;
  region?: string | null;
  period?: string | null;
  cultural_significance?: string | null;
  languages: string[];
  tags: string[];
  status: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  preferred_language: string;
  is_active: boolean;
};

type HeritageSubmission = {
  id: number;
  contributor_id: number;
  title: string;
  description: string;
  heritage_type: string;
  state: string;
  district?: string | null;
  language: string;
  community?: string | null;
  original_language?: string | null;
  transcript?: string | null;
  translation?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

const API =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const [items, setItems] = useState<Heritage[]>([]);
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Authentication
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] =
    useState<"login" | "register">("login");
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("English");

  // Account menu
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  // Profile and contributions
  const [profileOpen, setProfileOpen] = useState(false);
  const [contributionsOpen, setContributionsOpen] =
    useState(false);

  // Heritage submission
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [submissionBusy, setSubmissionBusy] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState("");

  const [mySubmissions, setMySubmissions] =
    useState<HeritageSubmission[]>([]);
  const [submissionsLoading, setSubmissionsLoading] =
    useState(false);
  const [submissionsError, setSubmissionsError] = useState("");

  const [submissionTitle, setSubmissionTitle] = useState("");
  const [submissionDescription, setSubmissionDescription] = useState("");
  const [submissionType, setSubmissionType] =
    useState("Oral Story");
  const [submissionState, setSubmissionState] = useState("");
  const [submissionDistrict, setSubmissionDistrict] =
    useState("");
  const [submissionLanguage, setSubmissionLanguage] =
    useState("Hindi");
  const [submissionCommunity, setSubmissionCommunity] =
    useState("");
  const [originalLanguage, setOriginalLanguage] =
    useState("");

  // =========================================================
  // LOAD HERITAGE
  // =========================================================

  async function loadHeritage() {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (state) params.set("state", state);
      if (type) params.set("type", type);

      const res = await fetch(
        `${API}/api/heritage?${params.toString()}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("API request failed");
      }

      setItems(await res.json());
    } catch {
      setError(
        "Could not connect to the backend. Start Docker with `docker compose up --build`."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // LOAD USER CONTRIBUTIONS
  // =========================================================

  async function loadMySubmissions() {
    const token = localStorage.getItem(
      "bharatvirasat_token"
    );

    if (!token) {
      setMySubmissions([]);
      return;
    }

    setSubmissionsLoading(true);
    setSubmissionsError("");

    try {
      const res = await fetch(
        `${API}/api/submissions/mine`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "Could not load your contributions."
        );
      }

      setMySubmissions(data);
    } catch (err) {
      setSubmissionsError(
        err instanceof Error
          ? err.message
          : "Could not load your contributions."
      );
    } finally {
      setSubmissionsLoading(false);
    }
  }

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadHeritage();

    const savedUser = localStorage.getItem(
      "bharatvirasat_user"
    );

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        setUser(parsedUser);
        loadMySubmissions();
      } catch {
        localStorage.removeItem("bharatvirasat_user");
        localStorage.removeItem("bharatvirasat_token");
      }
    }
  }, []);

  useEffect(() => {
    loadHeritage();
  }, [state, type]);

  const states = useMemo(
    () =>
      [...new Set(items.map((x) => x.state))].sort(),
    [items]
  );

  const types = useMemo(
    () =>
      [...new Set(items.map((x) => x.type))].sort(),
    [items]
  );

  // =========================================================
  // AUTHENTICATION
  // =========================================================

  async function handleAuth(e: FormEvent) {
    e.preventDefault();

    setAuthBusy(true);
    setAuthError("");

    try {
      const endpoint =
        authMode === "login"
          ? "/api/auth/login"
          : "/api/auth/register";

      const body =
        authMode === "login"
          ? {
              email,
              password,
            }
          : {
              name,
              email,
              password,
              preferred_language: language,
            };

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        const message =
          typeof data.detail === "string"
            ? data.detail
            : "Authentication failed";

        throw new Error(message);
      }

      localStorage.setItem(
        "bharatvirasat_token",
        data.access_token
      );

      localStorage.setItem(
        "bharatvirasat_user",
        JSON.stringify(data.user)
      );

      setUser(data.user);
      setAuthOpen(false);
      setAccountMenuOpen(false);

      await loadMySubmissions();

      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      setAuthError(
        err instanceof Error
          ? err.message
          : "Authentication failed"
      );
    } finally {
      setAuthBusy(false);
    }
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  function logout() {
    localStorage.removeItem("bharatvirasat_token");
    localStorage.removeItem("bharatvirasat_user");

    setUser(null);
    setMySubmissions([]);

    setAccountMenuOpen(false);
    setProfileOpen(false);
    setContributionsOpen(false);
  }

  // =========================================================
  // HERITAGE SUBMISSION
  // =========================================================

  async function handleSubmission(e: FormEvent) {
    e.preventDefault();

    if (!user) {
      setSubmissionError(
        "Please sign in before sharing your heritage."
      );
      return;
    }

    const token = localStorage.getItem(
      "bharatvirasat_token"
    );

    if (!token) {
      setSubmissionError(
        "Your session has expired. Please sign in again."
      );
      return;
    }

    setSubmissionBusy(true);
    setSubmissionError("");
    setSubmissionSuccess("");

    try {
      const res = await fetch(
        `${API}/api/submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: submissionTitle,
            description: submissionDescription,
            heritage_type: submissionType,
            state: submissionState,
            district: submissionDistrict || null,
            language: submissionLanguage,
            community: submissionCommunity || null,
            original_language:
              originalLanguage || null,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        const message =
          typeof data.detail === "string"
            ? data.detail
            : "Could not submit your heritage story.";

        throw new Error(message);
      }

      setSubmissionSuccess(
        "Your heritage contribution has been submitted successfully."
      );

      await loadMySubmissions();

      setSubmissionTitle("");
      setSubmissionType("Oral Story");
      setSubmissionState("");
      setSubmissionDistrict("");
      setSubmissionLanguage("Hindi");
      setSubmissionCommunity("");
      setOriginalLanguage("");
    } catch (err) {
      setSubmissionError(
        err instanceof Error
          ? err.message
          : "Could not submit your heritage story."
      );
    } finally {
      setSubmissionBusy(false);
    }
  }

  // =========================================================
  // OPEN PROFILE
  // =========================================================

  function openProfile() {
    setAccountMenuOpen(false);
    setProfileOpen(true);
  }

  // =========================================================
  // OPEN CONTRIBUTIONS
  // =========================================================

  function openContributions() {
    setAccountMenuOpen(false);
    setContributionsOpen(true);
    loadMySubmissions();
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main>
      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav className="nav">
        <div className="brand">
          <span>✦</span> BharatVirasat
        </div>

        <div className="nav-links">
          <a href="#explore">Explore</a>

          <a href="#living-heritage">
            Living Heritage
          </a>

          <a href="#about">About</a>

          <button
            className="outline-btn"
            onClick={() => {
              setAuthMode("login");
              setAuthError("");
              setAuthOpen(true);
            }}
          >
            Bharat AI
          </button>

          {/* =================================================
              LOGGED IN USER
          ================================================== */}

          {user ? (
            <div
              style={{
                position: "relative",
              }}
            >
              <button
                className="account-btn"
                onClick={() =>
                  setAccountMenuOpen(
                    (open) => !open
                  )
                }
                aria-haspopup="menu"
                aria-expanded={accountMenuOpen}
              >
                {user.name} ▾
              </button>

              {/* =============================================
                  ACCOUNT DROPDOWN
              ============================================== */}

              {accountMenuOpen && (
                <div
                  role="menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    right: 0,
                    width: "250px",
                    padding: "10px",
                    background: "#fffdf8",
                    border:
                      "1px solid rgba(42, 37, 29, 0.15)",
                    borderRadius: "16px",
                    boxShadow:
                      "0 18px 45px rgba(42, 37, 29, 0.16)",
                    zIndex: 1000,
                  }}
                >
                  {/* User mini information */}

                  <div
                    style={{
                      padding:
                        "10px 12px 14px",
                      borderBottom:
                        "1px solid rgba(42, 37, 29, 0.10)",
                      marginBottom: "6px",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        marginBottom: "3px",
                      }}
                    >
                      {user.name}
                    </strong>

                    <small
                      style={{
                        opacity: 0.6,
                      }}
                    >
                      {user.email}
                    </small>
                  </div>

                  {/* My Profile */}

                  <button
                    role="menuitem"
                    onClick={openProfile}
                    style={{
                      width: "100%",
                      border: 0,
                      background: "transparent",
                      padding: "12px",
                      textAlign: "left",
                      cursor: "pointer",
                      borderRadius: "10px",
                      fontSize: "15px",
                    }}
                  >
                    👤 My Profile
                  </button>

                  {/* My Contributions */}

                  <button
                    role="menuitem"
                    onClick={openContributions}
                    style={{
                      width: "100%",
                      border: 0,
                      background: "transparent",
                      padding: "12px",
                      textAlign: "left",
                      cursor: "pointer",
                      borderRadius: "10px",
                      fontSize: "15px",
                    }}
                  >
                    📚 My Contributions
                  </button>

                  {/* Logout */}

                  <button
                    role="menuitem"
                    onClick={logout}
                    style={{
                      width: "100%",
                      border: 0,
                      background: "transparent",
                      padding: "12px",
                      textAlign: "left",
                      cursor: "pointer",
                      borderRadius: "10px",
                      fontSize: "15px",
                      color: "#7b2d26",
                    }}
                  >
                    ↪ Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="dark-btn nav-auth"
              onClick={() => {
                setAuthMode("login");
                setAuthError("");
                setAuthOpen(true);
              }}
            >
              Sign in
            </button>
          )}
        </div>
      </nav>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            INDIA&apos;S LIVING HERITAGE
          </p>

          <h1>
            Discover the stories that make{" "}
            <em>India.</em>
          </h1>

          <p className="hero-text">
            Explore monuments, crafts, performing arts
            and living traditions — built on a
            foundation for verified cultural knowledge.
          </p>

          <a
            className="primary-btn"
            href="#explore"
          >
            Explore Heritage →
          </a>
        </div>

        <div className="hero-art">
          <div className="mandala">ॐ</div>

          <div className="hero-card">
            <span>PHASE 3</span>

            <strong>
              Living Heritage
              <br />
              Archive
            </strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPLORE
      ====================================================== */}

      <section
        id="explore"
        className="section"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              EXPLORE
            </p>

            <h2>
              India, entry by entry.
            </h2>
          </div>

          <span className="count">
            {items.length} records
          </span>
        </div>

        {/* Filters */}

        <div className="filters">
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              loadHeritage()
            }
            placeholder="Search heritage..."
          />

          <select
            value={state}
            onChange={(e) =>
              setState(e.target.value)
            }
          >
            <option value="">
              All states
            </option>

            {states.map((x) => (
              <option key={x}>
                {x}
              </option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <option value="">
              All categories
            </option>

            {types.map((x) => (
              <option key={x}>
                {x}
              </option>
            ))}
          </select>

          <button
            className="dark-btn"
            onClick={loadHeritage}
          >
            Search
          </button>
        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">
            Loading heritage records…
          </div>
        ) : (
          <div className="grid">
            {items.map((item) => (
              <article
                className="heritage-card"
                key={item.id}
              >
                <div className="card-top">
                  <span className="pill">
                    {item.type}
                  </span>

                  <span className="status">
                    {item.status.replace(
                      "_",
                      " "
                    )}
                  </span>
                </div>

                <h3>{item.name}</h3>

                <p className="location">
                  📍{" "}
                  {item.district
                    ? `${item.district}, `
                    : ""}
                  {item.state}
                </p>

                <p>
                  {item.description}
                </p>

                {item.cultural_significance && (
                  <div className="significance">
                    <small>
                      CULTURAL SIGNIFICANCE
                    </small>

                    <p>
                      {
                        item.cultural_significance
                      }
                    </p>
                  </div>
                )}

                <div className="tags">
                  {item.tags
                    .slice(0, 4)
                    .map((tag) => (
                      <span key={tag}>
                        #{tag}
                      </span>
                    ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =====================================================
          LIVING HERITAGE
      ====================================================== */}

      <section
        id="living-heritage"
        className="section living-heritage"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              LIVING HERITAGE
            </p>

            <h2>
              Preserve the stories that live
              beyond monuments.
            </h2>
          </div>
        </div>

        <div className="living-heritage-card">
          <div>
            <h3>
              Your knowledge is part of
              India&apos;s heritage.
            </h3>

            <p>
              Share an oral story, folk
              tradition, craft technique,
              recipe, ritual, local history
              or traditional knowledge with
              BharatVirasat.
            </p>

            <p className="trust-note">
              Your original contribution is
              preserved and can later be
              reviewed by researchers and
              the community.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => {
              if (!user) {
                setAuthMode("login");
                setAuthError("");
                setAuthOpen(true);
                return;
              }

              setSubmissionError("");
              setSubmissionSuccess("");
              setSubmissionOpen(true);
            }}
          >
            Share Your Heritage →
          </button>
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ====================================================== */}

      <section
        id="about"
        className="about"
      >
        <p className="eyebrow">
          THE FOUNDATION
        </p>

        <h2>
          Technology should preserve context,
          not replace it.
        </h2>

        <p>
          BharatVirasat is being built as a
          source-backed, multilingual platform
          for discovering and preserving
          India&apos;s tangible and intangible
          heritage. Phase 3 adds a Living
          Heritage Archive where community
          contributions can be submitted,
          preserved and tracked through a
          future verification workflow.
        </p>
      </section>

      <footer>
        BHARATVIRASAT · SIH 2026 · PHASE 3
      </footer>

      {/* =====================================================
          MY PROFILE MODAL
      ====================================================== */}

      {profileOpen && user && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setProfileOpen(false)
          }
        >
          <div
            className="auth-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              maxWidth: "720px",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            <button
              className="modal-close"
              onClick={() =>
                setProfileOpen(false)
              }
            >
              ×
            </button>

            <p className="eyebrow">
              BHARATVIRASAT IDENTITY
            </p>

            <h2>
              My Profile
            </h2>

            <p className="modal-subtitle">
              Your complete BharatVirasat
              account information.
            </p>

            {/* Profile avatar */}

            <div
              style={{
                width: "78px",
                height: "78px",
                borderRadius: "50%",
                background:
                  "#2a251d",
                color: "#fffdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: 700,
                margin:
                  "22px auto 26px",
              }}
            >
              {user.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            {/* Profile information */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
              }}
            >
              {/* Name */}

              <div
                style={{
                  padding: "16px",
                  border:
                    "1px solid rgba(42, 37, 29, 0.12)",
                  borderRadius: "14px",
                }}
              >
                <small>
                  FULL NAME
                </small>

                <strong
                  style={{
                    display: "block",
                    marginTop: "6px",
                  }}
                >
                  {user.name}
                </strong>
              </div>

              {/* Email */}

              <div
                style={{
                  padding: "16px",
                  border:
                    "1px solid rgba(42, 37, 29, 0.12)",
                  borderRadius: "14px",
                }}
              >
                <small>
                  EMAIL
                </small>

                <strong
                  style={{
                    display: "block",
                    marginTop: "6px",
                    wordBreak:
                      "break-word",
                  }}
                >
                  {user.email}
                </strong>
              </div>

              {/* User ID */}

              <div
                style={{
                  padding: "16px",
                  border:
                    "1px solid rgba(42, 37, 29, 0.12)",
                  borderRadius: "14px",
                }}
              >
                <small>
                  USER ID
                </small>

                <strong
                  style={{
                    display: "block",
                    marginTop: "6px",
                  }}
                >
                  #{user.id}
                </strong>
              </div>

              {/* Role */}

              <div
                style={{
                  padding: "16px",
                  border:
                    "1px solid rgba(42, 37, 29, 0.12)",
                  borderRadius: "14px",
                }}
              >
                <small>
                  ROLE
                </small>

                <strong
                  style={{
                    display: "block",
                    marginTop: "6px",
                  }}
                >
                  {user.role}
                </strong>
              </div>

              {/* Preferred language */}

              <div
                style={{
                  padding: "16px",
                  border:
                    "1px solid rgba(42, 37, 29, 0.12)",
                  borderRadius: "14px",
                }}
              >
                <small>
                  PREFERRED LANGUAGE
                </small>

                <strong
                  style={{
                    display: "block",
                    marginTop: "6px",
                  }}
                >
                  {user.preferred_language}
                </strong>
              </div>

              {/* Account status */}

              <div
                style={{
                  padding: "16px",
                  border:
                    "1px solid rgba(42, 37, 29, 0.12)",
                  borderRadius: "14px",
                }}
              >
                <small>
                  ACCOUNT STATUS
                </small>

                <strong
                  style={{
                    display: "block",
                    marginTop: "6px",
                  }}
                >
                  {user.is_active
                    ? "Active"
                    : "Inactive"}
                </strong>
              </div>

              {/* Contributions */}

              <div
                style={{
                  padding: "16px",
                  border:
                    "1px solid rgba(42, 37, 29, 0.12)",
                  borderRadius: "14px",
                }}
              >
                <small>
                  MY CONTRIBUTIONS
                </small>

                <strong
                  style={{
                    display: "block",
                    marginTop: "6px",
                  }}
                >
                  {mySubmissions.length}
                </strong>
              </div>
            </div>

            {/* Profile actions */}

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "26px",
              }}
            >
              <button
                className="primary-btn"
                onClick={() => {
                  setProfileOpen(false);
                  openContributions();
                }}
              >
                📚 My Contributions
              </button>

              <button
                className="outline-btn"
                onClick={() => {
                  setProfileOpen(false);
                  setSubmissionError("");
                  setSubmissionSuccess("");
                  setSubmissionOpen(true);
                }}
              >
                + Share Your Heritage
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MY CONTRIBUTIONS MODAL
      ====================================================== */}

      {contributionsOpen && user && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setContributionsOpen(false)
          }
        >
          <div
            className="auth-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              maxWidth: "820px",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            <button
              className="modal-close"
              onClick={() =>
                setContributionsOpen(false)
              }
            >
              ×
            </button>

            <p className="eyebrow">
              LIVING HERITAGE ARCHIVE
            </p>

            <h2>
              My Contributions
            </h2>

            <p className="modal-subtitle">
              Every story, tradition and
              piece of knowledge you have
              shared with BharatVirasat.
            </p>

            {/* Contribution count */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
                gap: "12px",
                marginTop: "22px",
                marginBottom: "18px",
                padding: "14px 16px",
                borderRadius: "14px",
                background:
                  "rgba(42, 37, 29, 0.05)",
              }}
            >
              <strong>
                Your Heritage Archive
              </strong>

              <span className="count">
                {mySubmissions.length}
              </span>
            </div>

            {submissionsError && (
              <div className="error">
                {submissionsError}
              </div>
            )}

            {submissionsLoading ? (
              <div className="loading">
                Loading your
                contributions…
              </div>
            ) : mySubmissions.length ===
              0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "35px 20px",
                }}
              >
                <div
                  style={{
                    fontSize: "42px",
                    marginBottom: "12px",
                  }}
                >
                  🪔
                </div>

                <h3>
                  Your heritage archive
                  starts here.
                </h3>

                <p>
                  You have not shared
                  any heritage
                  contributions yet.
                  Share a story,
                  tradition, craft,
                  recipe or traditional
                  knowledge with
                  BharatVirasat.
                </p>

                <button
                  className="primary-btn"
                  onClick={() => {
                    setContributionsOpen(
                      false
                    );

                    setSubmissionError(
                      ""
                    );

                    setSubmissionSuccess(
                      ""
                    );

                    setSubmissionOpen(
                      true
                    );
                  }}
                >
                  Share Your First
                  Contribution →
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "15px",
                }}
              >
                {mySubmissions.map(
                  (submission) => (
                    <article
                      key={
                        submission.id
                      }
                      style={{
                        border:
                          "1px solid rgba(42, 37, 29, 0.12)",
                        borderRadius:
                          "16px",
                        padding: "18px",
                      }}
                    >
                      {/* Top */}

                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "center",
                          gap: "10px",
                          flexWrap:
                            "wrap",
                          marginBottom:
                            "12px",
                        }}
                      >
                        <span className="pill">
                          {
                            submission.heritage_type
                          }
                        </span>

                        <span className="status">
                          {submission.status.replace(
                            "_",
                            " "
                          )}
                        </span>
                      </div>

                      {/* Title */}

                      <h3>
                        {
                          submission.title
                        }
                      </h3>

                      {/* Location */}

                      <p className="location">
                        📍{" "}
                        {submission.district
                          ? `${submission.district}, `
                          : ""}
                        {
                          submission.state
                        }
                      </p>

                      {/* Description */}

                      <p>
                        {
                          submission.description
                        }
                      </p>

                      {/* Metadata */}

                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap:
                            "wrap",
                          marginTop:
                            "14px",
                        }}
                      >
                        <span
                          style={{
                            padding:
                              "6px 10px",
                            borderRadius:
                              "999px",
                            background:
                              "rgba(42, 37, 29, 0.06)",
                            fontSize:
                              "13px",
                          }}
                        >
                          🌐{" "}
                          {
                            submission.language
                          }
                        </span>

                        {submission.original_language && (
                          <span
                            style={{
                              padding:
                                "6px 10px",
                              borderRadius:
                                "999px",
                              background:
                                "rgba(42, 37, 29, 0.06)",
                              fontSize:
                                "13px",
                            }}
                          >
                            Original:{" "}
                            {
                              submission.original_language
                            }
                          </span>
                        )}

                        {submission.community && (
                          <span
                            style={{
                              padding:
                                "6px 10px",
                              borderRadius:
                                "999px",
                              background:
                                "rgba(42, 37, 29, 0.06)",
                              fontSize:
                                "13px",
                            }}
                          >
                            Community:{" "}
                            {
                              submission.community
                            }
                          </span>
                        )}

                        <span
                          style={{
                            padding:
                              "6px 10px",
                            borderRadius:
                              "999px",
                            background:
                              "rgba(42, 37, 29, 0.06)",
                            fontSize:
                              "13px",
                          }}
                        >
                          Submitted:{" "}
                          {new Date(
                            submission.created_at
                          ).toLocaleDateString(
                            "en-IN"
                          )}
                        </span>
                      </div>

                      {/* Translation if available */}

                      {submission.translation && (
                        <div
                          style={{
                            marginTop:
                              "14px",
                            padding:
                              "12px",
                            borderRadius:
                              "10px",
                            background:
                              "rgba(42, 37, 29, 0.04)",
                          }}
                        >
                          <small>
                            TRANSLATION
                          </small>

                          <p>
                            {
                              submission.translation
                            }
                          </p>
                        </div>
                      )}

                      {/* Transcript if available */}

                      {submission.transcript && (
                        <div
                          style={{
                            marginTop:
                              "10px",
                            padding:
                              "12px",
                            borderRadius:
                              "10px",
                            background:
                              "rgba(42, 37, 29, 0.04)",
                          }}
                        >
                          <small>
                            TRANSCRIPT
                          </small>

                          <p>
                            {
                              submission.transcript
                            }
                          </p>
                        </div>
                      )}
                    </article>
                  )
                )}
              </div>
            )}

            {/* Bottom action */}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                gap: "12px",
                flexWrap:
                  "wrap",
                marginTop: "25px",
              }}
            >
              <strong>
                {mySubmissions.length}{" "}
                contribution
                {mySubmissions.length !==
                1
                  ? "s"
                  : ""}
              </strong>

              <button
                className="primary-btn"
                onClick={() => {
                  setContributionsOpen(
                    false
                  );

                  setSubmissionError("");
                  setSubmissionSuccess("");
                  setSubmissionOpen(true);
                }}
              >
                + Share New Heritage
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          AUTH MODAL
      ====================================================== */}

      {authOpen && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setAuthOpen(false)
          }
        >
          <div
            className="auth-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setAuthOpen(false)
              }
            >
              ×
            </button>

            <p className="eyebrow">
              BHARATVIRASAT IDENTITY
            </p>

            <h2>
              {authMode === "login"
                ? "Welcome back."
                : "Create your account."}
            </h2>

            <p className="modal-subtitle">
              {authMode === "login"
                ? "Sign in to access your BharatVirasat identity."
                : "Your role starts as Visitor and can evolve as the platform grows."}
            </p>

            <form
              onSubmit={handleAuth}
              className="auth-form"
            >
              {authMode ===
                "register" && (
                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Full name"
                  required
                />
              )}

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Email"
                required
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Password (8+ characters)"
                minLength={8}
                required
              />

              {authMode ===
                "register" && (
                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(
                      e.target.value
                    )
                  }
                >
                  <option>
                    English
                  </option>

                  <option>
                    Hindi
                  </option>

                  <option>
                    Gujarati
                  </option>
                </select>
              )}

              {authError && (
                <div className="error">
                  {authError}
                </div>
              )}

              <button
                className="primary-btn auth-submit"
                disabled={authBusy}
              >
                {authBusy
                  ? "Please wait…"
                  : authMode === "login"
                  ? "Sign in"
                  : "Create account"}
              </button>
            </form>

            <button
              className="switch-auth"
              onClick={() => {
                setAuthMode(
                  authMode === "login"
                    ? "register"
                    : "login"
                );

                setAuthError("");
              }}
            >
              {authMode === "login"
                ? "New to BharatVirasat? Create an account"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          SHARE HERITAGE MODAL
      ====================================================== */}

      {submissionOpen && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setSubmissionOpen(false)
          }
        >
          <div
            className="auth-modal submission-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setSubmissionOpen(false)
              }
            >
              ×
            </button>

            <p className="eyebrow">
              LIVING HERITAGE ARCHIVE
            </p>

            <h2>
              Share your heritage.
            </h2>

            <p className="modal-subtitle">
              Help preserve a story,
              tradition, practice or
              knowledge from your
              community.
            </p>

            <form
              onSubmit={handleSubmission}
              className="auth-form"
            >
              <input
                value={submissionTitle}
                onChange={(e) =>
                  setSubmissionTitle(
                    e.target.value
                  )
                }
                placeholder="Title of your heritage contribution"
                required
              />

              <textarea
                value={submissionDescription}
                onChange={(e) =>
                setSubmissionDescription(e.target.value)
}
                placeholder="Tell us about this tradition, story or knowledge..."
                rows={5}
                required
              />

              <select
                value={submissionType}
                onChange={(e) =>
                  setSubmissionType(
                    e.target.value
                  )
                }
              >
                <option>
                  Oral Story
                </option>

                <option>
                  Folk Song
                </option>

                <option>
                  Ritual / Tradition
                </option>

                <option>
                  Traditional Recipe
                </option>

                <option>
                  Craft Knowledge
                </option>

                <option>
                  Folk Art
                </option>

                <option>
                  Local History
                </option>

                <option>
                  Traditional Knowledge
                </option>

                <option>
                  Dialect / Language
                </option>

                <option>
                  Other
                </option>
              </select>

              <input
                value={submissionState}
                onChange={(e) =>
                  setSubmissionState(
                    e.target.value
                  )
                }
                placeholder="State"
                required
              />

              <input
                value={submissionDistrict}
                onChange={(e) =>
                  setSubmissionDistrict(
                    e.target.value
                  )
                }
                placeholder="District"
              />

              <select
                value={submissionLanguage}
                onChange={(e) =>
                  setSubmissionLanguage(
                    e.target.value
                  )
                }
              >
                <option>
                  Hindi
                </option>

                <option>
                  Gujarati
                </option>

                <option>
                  English
                </option>

                <option>
                  Bengali
                </option>

                <option>
                  Marathi
                </option>

                <option>
                  Tamil
                </option>

                <option>
                  Telugu
                </option>

                <option>
                  Kannada
                </option>

                <option>
                  Malayalam
                </option>

                <option>
                  Punjabi
                </option>

                <option>
                  Other
                </option>
              </select>

              <input
                value={originalLanguage}
                onChange={(e) =>
                  setOriginalLanguage(
                    e.target.value
                  )
                }
                placeholder="Original language / local dialect"
              />

              <input
                value={submissionCommunity}
                onChange={(e) =>
                  setSubmissionCommunity(
                    e.target.value
                  )
                }
                placeholder="Community / tradition (optional)"
              />

              {submissionError && (
                <div className="error">
                  {submissionError}
                </div>
              )}

              {submissionSuccess && (
                <div className="success">
                  {submissionSuccess}
                </div>
              )}

              <button
                className="primary-btn auth-submit"
                disabled={submissionBusy}
              >
                {submissionBusy
                  ? "Submitting…"
                  : "Submit Heritage"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}