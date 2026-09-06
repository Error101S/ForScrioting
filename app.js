const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const STORAGE_KEY = "lauucodes_google_user";

const signedOutSection = document.getElementById("signedOut");
const signedInSection = document.getElementById("signedIn");
const statusText = document.getElementById("statusText");
const avatar = document.getElementById("avatar");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const signOutBtn = document.getElementById("signOutBtn");

function parseJwt(token) {
  const base64Payload = token.split(".")[1];
  const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
  return JSON.parse(payload);
}

function saveUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function loadUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function showSignedIn(user) {
  fullName.textContent = user.name || "Google User";
  email.textContent = user.email || "No email provided";
  avatar.src = user.picture || "";
  statusText.textContent = `Signed in as ${user.email || user.name || "Google User"}`;

  signedOutSection.classList.add("hidden");
  signedInSection.classList.remove("hidden");
}

function showSignedOut() {
  statusText.textContent = "Not signed in";
  signedInSection.classList.add("hidden");
  signedOutSection.classList.remove("hidden");
}

function initializeGoogle() {
  if (GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
    statusText.textContent = "Add your Google Client ID in app.js first";
    signedOutSection.classList.remove("hidden");
    return;
  }

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
    auto_select: true,
  });

  google.accounts.id.renderButton(document.getElementById("googleButton"), {
    theme: "outline",
    size: "large",
    text: "signin_with",
  });

  google.accounts.id.prompt();
}

function handleCredentialResponse(response) {
  if (!response?.credential) return;

  const decoded = parseJwt(response.credential);
  const user = {
    sub: decoded.sub,
    name: decoded.name,
    email: decoded.email,
    picture: decoded.picture,
  };

  saveUser(user);
  showSignedIn(user);
}

window.handleCredentialResponse = handleCredentialResponse;

signOutBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  google.accounts.id.disableAutoSelect();
  showSignedOut();
});

const rememberedUser = loadUser();
if (rememberedUser) {
  showSignedIn(rememberedUser);
} else {
  showSignedOut();
}

window.addEventListener("load", initializeGoogle);
