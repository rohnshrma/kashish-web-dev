"""Generates the Blog App + Role-Based Auth API assignment brief PDF."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    ListFlowable,
    ListItem,
    HRFlowable,
    Preformatted,
    KeepTogether,
)

OUT = "/Users/rohan/dev/Classes/kashish-web-dev/backend-apis/blog_auth_api_assignment.pdf"

NAVY = colors.HexColor("#1f2937")
ACCENT = colors.HexColor("#2563eb")
LIGHT_BG = colors.HexColor("#f3f4f6")
MUTED = colors.HexColor("#4b5563")
BORDER = colors.HexColor("#d1d5db")

styles = getSampleStyleSheet()

styles.add(ParagraphStyle(
    name="DocTitle", fontName="Helvetica-Bold", fontSize=22, leading=26,
    textColor=NAVY, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="SubTitle", fontName="Helvetica", fontSize=11.5, leading=15,
    textColor=MUTED, spaceAfter=16,
))
styles.add(ParagraphStyle(
    name="H1", fontName="Helvetica-Bold", fontSize=14.5, leading=18,
    textColor=NAVY, spaceBefore=18, spaceAfter=8,
))
styles.add(ParagraphStyle(
    name="H2", fontName="Helvetica-Bold", fontSize=11.5, leading=15,
    textColor=ACCENT, spaceBefore=12, spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="Body", fontName="Helvetica", fontSize=9.7, leading=14,
    textColor=colors.HexColor("#111827"), spaceAfter=6, alignment=TA_LEFT,
))
styles.add(ParagraphStyle(
    name="BodyMuted", fontName="Helvetica-Oblique", fontSize=9.3, leading=13,
    textColor=MUTED, spaceAfter=6,
))
styles.add(ParagraphStyle(
    name="BulletItem", fontName="Helvetica", fontSize=9.7, leading=14,
    textColor=colors.HexColor("#111827"),
))
styles.add(ParagraphStyle(
    name="Mono", fontName="Courier", fontSize=8.7, leading=12,
    textColor=colors.HexColor("#111827"), backColor=LIGHT_BG,
))
styles.add(ParagraphStyle(
    name="TableHead", fontName="Helvetica-Bold", fontSize=8.8, leading=11,
    textColor=colors.white,
))
styles.add(ParagraphStyle(
    name="TableCell", fontName="Helvetica", fontSize=8.6, leading=11.5,
    textColor=colors.HexColor("#111827"),
))
styles.add(ParagraphStyle(
    name="TableCellMono", fontName="Courier", fontSize=8.2, leading=11,
    textColor=colors.HexColor("#111827"),
))

def h1(text):
    return Paragraph(text, styles["H1"])

def h2(text):
    return Paragraph(text, styles["H2"])

def body(text):
    return Paragraph(text, styles["Body"])

def bullets(items, bullet_char="•"):
    return ListFlowable(
        [ListItem(Paragraph(it, styles["BulletItem"]), leftIndent=4, spaceAfter=4) for it in items],
        bulletType="bullet", start=bullet_char, leftIndent=14, bulletFontSize=8,
    )

def numbered(items):
    return ListFlowable(
        [ListItem(Paragraph(it, styles["BulletItem"]), leftIndent=4, spaceAfter=5) for it in items],
        bulletType="1", leftIndent=16, bulletFontSize=9,
    )

def rule():
    return HRFlowable(width="100%", thickness=0.8, color=BORDER, spaceBefore=6, spaceAfter=10)

def make_table(header, rows, col_widths, header_bg=NAVY):
    data = [[Paragraph(h, styles["TableHead"]) for h in header]]
    for r in rows:
        data.append([Paragraph(c, styles["TableCellMono"]) if i == 0 else Paragraph(c, styles["TableCell"]) for i, c in enumerate(r)])
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), header_bg),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, LIGHT_BG]),
        ("GRID", (0, 0), (-1, -1), 0.6, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t

doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    topMargin=18 * mm, bottomMargin=16 * mm,
    leftMargin=18 * mm, rightMargin=18 * mm,
    title="Blog App API with Role-Based Authentication",
    author="Kashish Web Dev",
)

story = []

# ---------- Title ----------
story.append(Paragraph("Blog App API — Role-Based Authentication", styles["DocTitle"]))
story.append(Paragraph(
    "Assignment Brief &nbsp;·&nbsp; Backend-only REST API (JSON responses) &nbsp;·&nbsp; Node.js + Express + MongoDB",
    styles["SubTitle"],
))
story.append(rule())

# ---------- Overview ----------
story.append(h1("1. Overview"))
story.append(body(
    "You will build a <b>Blog App REST API</b> — an API-only backend that returns JSON, with no server-rendered "
    "views. This assignment extends the pattern you used in the <b>To-Do List API</b> (<font face='Courier'>backend-apis/todo_api</font>) "
    "by adding <b>authentication</b> (signup/login) and <b>role-based authorization</b> (who is allowed to do what) "
    "on top of a full CRUD resource."
))
story.append(body(
    "This brief gives you the end-to-end steps and requirements only — <b>no solution code</b>. Re-use the same "
    "project structure, coding conventions, and JSON response format you used in the To-Do List API."
))

story.append(h2("Learning Objectives"))
story.append(bullets([
    "Structure an Express API using the Model – Routes – Controllers pattern.",
    "Hash and verify passwords securely with <font face='Courier'>bcrypt</font>.",
    "Issue and verify stateless <font face='Courier'>JWT</font> tokens for authentication.",
    "Write Express <b>middleware</b> to protect routes and enforce roles.",
    "Model a one-to-many relationship (User → Blogs) with Mongoose <font face='Courier'>ref</font>.",
    "Design consistent success/error JSON responses across an entire API.",
]))

# ---------- Tech stack ----------
story.append(h1("2. Tech Stack"))
story.append(bullets([
    "<b>Runtime:</b> Node.js, ES Modules (<font face='Courier'>\"type\": \"module\"</font>, same as todo_api)",
    "<b>Framework:</b> Express 5",
    "<b>Database:</b> MongoDB with Mongoose",
    "<b>Auth:</b> <font face='Courier'>bcrypt</font> for password hashing + <font face='Courier'>jsonwebtoken</font> for stateless auth "
    "(Passport.js with <font face='Courier'>passport-jwt</font> is an acceptable alternative if you'd rather practice Passport strategies — "
    "but since this is a token-based JSON API and not a session-based app, plain bcrypt + JWT is the recommended default)",
    "<b>Dev tooling:</b> <font face='Courier'>dotenv</font>, <font face='Courier'>morgan</font>, <font face='Courier'>nodemon</font>",
]))
story.append(body(
    "Note: the To-Do List API's <font face='Courier'>package.json</font> already lists <font face='Courier'>bcrypt</font> and "
    "<font face='Courier'>jsonwebtoken</font> as dependencies — reuse that same package.json as your starting point."
))

# ---------- Project structure ----------
story.append(h1("3. Project Structure"))
story.append(body("Follow the exact same folder layout as <font face='Courier'>todo_api</font>, with one addition — a <font face='Courier'>middlewares/</font> folder:"))

tree = """blog_auth_api/
├── config/
│   └── db.js                 # mongoose connection (same pattern as todo_api)
├── models/
│   ├── userModel.js           # User schema
│   └── blogModel.js           # Blog schema
├── controllers/
│   ├── authControllers.js     # register, login, getProfile
│   └── blogControllers.js     # CRUD for blogs
├── middlewares/
│   ├── authMiddleware.js      # verifies JWT, attaches req.user
│   └── roleMiddleware.js      # restricts access by role
├── routes/
│   ├── authRoutes.js
│   └── blogRoutes.js
├── .env
├── .gitignore
├── package.json
└── server.js"""
story.append(Preformatted(tree, styles["Mono"]))

# ---------- Data models ----------
story.append(h1("4. Data Models"))

story.append(h2("User"))
story.append(make_table(
    ["Field", "Type / Rules"],
    [
        ["name", "String, required"],
        ["email", "String, required, unique, lowercase, valid email format"],
        ["password", "String, required, min length 6 — store the <b>bcrypt hash</b>, never the plain text"],
        ["role", "String enum: \"user\" | \"admin\" — default \"user\""],
        ["timestamps", "createdAt / updatedAt (schema option, same as todo_api's Task model)"],
    ],
    [35 * mm, 115 * mm],
))

story.append(Spacer(1, 8))
story.append(h2("Blog"))
story.append(make_table(
    ["Field", "Type / Rules"],
    [
        ["title", "String, required, min length 3"],
        ["content", "String, required, min length 10"],
        ["author", "ObjectId, <font face='Courier'>ref: \"User\"</font>, required — set from the logged-in user, never from the request body"],
        ["timestamps", "createdAt / updatedAt"],
    ],
    [35 * mm, 115 * mm],
))

# ---------- env vars ----------
story.append(h1("5. Environment Variables (.env)"))
story.append(make_table(
    ["Key", "Purpose"],
    [
        ["PORT", "Port the server listens on (e.g. 3004)"],
        ["MONGO_URI", "MongoDB connection string"],
        ["JWT_SECRET", "Secret used to sign/verify JWTs — long, random, never committed"],
        ["JWT_EXPIRES_IN", "Token lifetime, e.g. \"7d\""],
    ],
    [40 * mm, 110 * mm],
))

# ---------- response format ----------
story.append(h1("6. Response Format Convention"))
story.append(body(
    "Keep the exact same JSON envelope you used in the To-Do List API for <b>every</b> endpoint — success and error alike:"
))
story.append(Preformatted(
    '{\n  "message": "<human readable message>",\n  "status": "success" | "failed",\n  "data": <object | array | null>\n}',
    styles["Mono"],
))
story.append(body(
    "Use the same status codes you used before: <font face='Courier'>200</font> success, "
    "<font face='Courier'>400</font> bad request / validation error, <font face='Courier'>401</font> not authenticated, "
    "<font face='Courier'>403</font> not authorized (wrong role / not the owner), <font face='Courier'>404</font> not found."
))

story.append(rule())

# ---------- Build plan ----------
story.append(h1("7. Step-by-Step Build Plan"))
story.append(body("Work through these milestones in order. Each one should be a working, testable increment."))

milestones = [
    ("Milestone 1 — Project Setup",
     [
        "Scaffold the folder structure shown in Section 3 inside a new <font face='Courier'>blog_auth_api/</font> project.",
        "Copy <font face='Courier'>package.json</font> from todo_api and adjust the name; run <font face='Courier'>npm install</font>.",
        "Create <font face='Courier'>.env</font> with the variables from Section 5, and a <font face='Courier'>.gitignore</font> (copy todo_api's).",
        "Set up <font face='Courier'>server.js</font>: load env, connect DB, mount <font face='Courier'>express.json()</font> and <font face='Courier'>morgan</font>, "
        "mount the two route groups at <font face='Courier'>/api/auth</font> and <font face='Courier'>/api/blogs</font>, start listening.",
     ]),
    ("Milestone 2 — Database Connection & User Model",
     [
        "Reuse the <font face='Courier'>config/db.js</font> connection pattern from todo_api unchanged.",
        "Create the User schema exactly as specified in Section 4 — do not skip the <font face='Courier'>role</font> enum/default.",
     ]),
    ("Milestone 3 — Auth Controller: Register",
     [
        "Build <font face='Courier'>POST /api/auth/register</font>: validate name/email/password are present and meet the rules in Section 4.",
        "Check no existing user has that email; if one does, respond 400 with a clear message.",
        "Hash the password with bcrypt before saving — decide and document your salt rounds (10 is a reasonable default).",
        "Create the user with role always forced to \"user\" from the server side, regardless of anything sent in the request body.",
        "Respond with the created user's public fields only — never return the password hash in any response, ever.",
     ]),
    ("Milestone 4 — Auth Controller: Login",
     [
        "Build <font face='Courier'>POST /api/auth/login</font>: find the user by email; if not found, respond 400/401 without revealing "
        "whether the email or the password was wrong (just \"Invalid credentials\").",
        "Compare the submitted password against the stored hash with bcrypt.",
        "On success, sign a JWT containing the user's id and role, using <font face='Courier'>JWT_SECRET</font> and "
        "<font face='Courier'>JWT_EXPIRES_IN</font>, and return it in the response data.",
     ]),
    ("Milestone 5 — Auth Middleware",
     [
        "Write <font face='Courier'>middlewares/authMiddleware.js</font>: read the token from the "
        "<font face='Courier'>Authorization: Bearer &lt;token&gt;</font> header.",
        "If missing or invalid/expired, respond 401 and stop the request — do not call <font face='Courier'>next()</font>.",
        "If valid, fetch the user (or trust the decoded payload) and attach it to <font face='Courier'>req.user</font>, then call "
        "<font face='Courier'>next()</font>.",
     ]),
    ("Milestone 6 — Role Middleware",
     [
        "Write <font face='Courier'>middlewares/roleMiddleware.js</font> as a small factory function that takes a list of allowed roles "
        "and returns a middleware.",
        "It should run <b>after</b> authMiddleware, read <font face='Courier'>req.user.role</font>, and respond 403 if the role isn't in "
        "the allowed list, otherwise call <font face='Courier'>next()</font>.",
     ]),
    ("Milestone 7 — Blog Model & Controller (CRUD)",
     [
        "Create the Blog schema exactly as specified in Section 4.",
        "Build the five controller functions in <font face='Courier'>blogControllers.js</font>, following the same try/catch + "
        "validation + response-envelope style as <font face='Courier'>taskControllers.js</font>: "
        "GET all, GET one, CREATE, UPDATE, DELETE.",
        "On CREATE, set <font face='Courier'>author</font> from <font face='Courier'>req.user.id</font> — never trust an author id sent "
        "in the request body.",
        "On UPDATE/DELETE, first fetch the blog; if it doesn't exist, 404. Then apply the ownership rule from Section 9 before "
        "modifying it.",
     ]),
    ("Milestone 8 — Wire Up Routes & Protection",
     [
        "In <font face='Courier'>authRoutes.js</font>: register and login are public; add one protected route, e.g. "
        "<font face='Courier'>GET /api/auth/me</font>, that returns the logged-in user's own profile.",
        "In <font face='Courier'>blogRoutes.js</font>: apply <font face='Courier'>authMiddleware</font> to every route except the two "
        "public GET routes (list all, get one) per the table in Section 9.",
     ]),
    ("Milestone 9 — Enforce Ownership + Role Rules",
     [
        "Inside the UPDATE and DELETE controllers, allow the action only if "
        "<font face='Courier'>req.user.id === blog.author</font> <b>or</b> <font face='Courier'>req.user.role === \"admin\"</font>.",
        "Anything else should return 403 with a message like \"Not authorized to modify this blog\".",
     ]),
    ("Milestone 10 — Manual Testing",
     [
        "Using Postman/Thunder Client, walk through: register → login → copy token → create a blog → try updating it as the same "
        "user (should succeed) → try updating it as a different logged-in user (should 403) → try again as an admin user (should "
        "succeed) → delete it.",
        "Also test the failure paths: missing token, expired/garbled token, duplicate email on register, wrong password on login, "
        "invalid blog id on update.",
     ]),
]

for title, steps in milestones:
    block = [h2(title), numbered(steps)]
    story.append(KeepTogether(block))

story.append(rule())

# ---------- Endpoints table ----------
story.append(h1("8. API Endpoints"))
story.append(make_table(
    ["Method & Path", "Access", "Description"],
    [
        ["POST /api/auth/register", "Public", "Create a new account (role always defaults to \"user\")"],
        ["POST /api/auth/login", "Public", "Authenticate and receive a JWT"],
        ["GET /api/auth/me", "Logged-in user", "Return the current user's own profile"],
        ["GET /api/blogs", "Public", "List all blogs"],
        ["GET /api/blogs/:id", "Public", "Get a single blog by id"],
        ["POST /api/blogs", "Logged-in user", "Create a blog (author = current user)"],
        ["PUT /api/blogs/:id", "Owner or admin", "Update a blog"],
        ["DELETE /api/blogs/:id", "Owner or admin", "Delete a blog"],
    ],
    [55 * mm, 32 * mm, 63 * mm],
))

# ---------- Role rules ----------
story.append(h1("9. Role-Based Access Rules"))
story.append(make_table(
    ["Role", "Can do"],
    [
        ["user (default)", "Register/login; read all blogs; create blogs; update/delete <b>only their own</b> blogs; view their own profile"],
        ["admin", "Everything a user can do, plus update/delete <b>any</b> user's blog"],
    ],
    [30 * mm, 120 * mm],
))
story.append(body(
    "There is no public signup path to become an admin — for this assignment it's enough to create an admin by manually "
    "setting <font face='Courier'>role: \"admin\"</font> on a user document directly in MongoDB (e.g. via Compass or the shell) "
    "after registering normally."
))

# ---------- Bonus ----------
story.append(h1("10. Bonus Challenges (optional)"))
story.append(bullets([
    "Add <font face='Courier'>GET /api/blogs/mine</font> — return only the logged-in user's own blogs.",
    "Add pagination (<font face='Courier'>?page=&limit=</font>) and simple title search (<font face='Courier'>?search=</font>) to the list-blogs endpoint.",
    "Add an admin-only <font face='Courier'>GET /api/users</font> endpoint to list all registered users.",
    "Add a <font face='Courier'>PUT /api/auth/me</font> endpoint so a user can update their own name/password.",
    "Rate-limit the login endpoint to slow down brute-force attempts.",
]))

# ---------- Submission checklist ----------
story.append(h1("11. Submission Checklist"))
story.append(bullets([
    "Folder structure matches Section 3 (config / models / controllers / middlewares / routes / server.js).",
    "Passwords are never stored or returned in plain text.",
    "JWT is required (via authMiddleware) on every route that should be protected, per Section 8.",
    "Ownership + role checks match Section 9 exactly.",
    "Every response — success and error — follows the envelope in Section 6.",
    "<font face='Courier'>.env</font> is git-ignored; a <font face='Courier'>.env.example</font> (no real secrets) is committed instead.",
    "README with setup steps and a short list of all endpoints.",
]))

doc.build(story)
print("Wrote", OUT)
