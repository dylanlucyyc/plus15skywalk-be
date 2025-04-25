# +15 Skywalk Website

## What is +15 Skywalk?

The +15 Skywalk is a network of elevated, climate-controlled pedestrian walkways in downtown Calgary, Alberta. Named for being approximately 15 feet above street level, the system connects over 100 buildings across 18 kilometers of pathways, making it the largest indoor pedestrian system of its kind in the world.

It allows people to move comfortably between offices, shopping centers, hotels, and public buildings, especially useful during Calgary’s harsh winters. Originally developed in the 1970s, the +15 has become an iconic part of the city’s infrastructure, helping reduce street-level congestion while promoting convenience and accessibility downtown.

## What problem does this application solve?

This website is a digital hub for Calgary’s +15 Skywalk system. It offers real-time information on news, events, and hospitality services connected to the +15 network. Designed for both locals and visitors, the site helps users easily navigate the extensive skywalk system, stay informed about downtown happenings, and discover nearby cafes, shops, and amenities, all in one place. At its core, the platform bridges the physical network of the +15 with a modern, intuitive digital experience.

## What features contribute to solving given issues?

### Interactive Map Integration:

Users can explore an easy-to-navigate digital map of the +15, including real-time updates on walkway access, closures, and points of interest.

### Event & News Feed:

Curated updates keep users in the loop about downtown events, building announcements, or construction alerts affecting skywalk routes.

### Hospitality Directory:

A categorized list of food, retail, and services within the +15 system helps people quickly find what they need, especially during winter months.

### Mobile Responsiveness:

Optimized for on-the-go access, allowing users to check the map or find services while walking through the +15.

## Challenges faced:

### Data Limitations:

As a student project with a limited timeline, I don’t have access to real-time or official +15 data. Instead, I rely on publicly available resources and manually mapped out sample routes and points of interest to simulate functionality.

### Map Accuracy:

Creating a representative map of such a large and complex system without detailed GIS data or official support posed a challenge. We focused on a small section of the +15 to demonstrate the concept.

### Balancing Scope and Features:

With limited development time, we prioritized core features like an interactive map and basic listings over full backend integration or live updates.

### Tool Familiarity:

Learning and implementing Mapbox for the first time required time for experimentation, especially when customizing styles and working with GeoJSON data.

---

## User Stories

### Background

+15 Connect is a web-based platform that helps users explore Calgary’s +15 Skywalk system. Visitors can browse an interactive map of the walkways and view sample points of interest, including restaurants and cafes.

Users can sign up by providing a name, email, and password. The email must be unique to the system. After signing in, users can favorite restaurants or hospitality venues they like. These favorites are saved to their profile, allowing quick access the next time they visit the site.

The platform also features a basic Events section and news updates relevant to the +15 system. While real-time data is not available, the site simulates how future features like walkway closure alerts, traffic levels, and accessibility tools could be integrated.

In future versions, +15 Connect could expand user profiles to include saved routes, accessibility preferences, and notification settings for event updates or closures. Additionally, I am also planning to implement the UI for the CMS system to further optimize the data input process.

---

### Authentication & Users

- **As a new user**, I want to create an account using my name, email, and password, so that I can save favorites and personalize my experience.
- **As a system**, I want to ensure no two users can register with the same email, so that account integrity is maintained.
- **As a system**, I want to encrypt user passwords before storing them in the database, so that user credentials are protected from unauthorized access.
- **As a returning user**, I want to log in using my email and password, so that I can access my saved favorites.
- **As a logged-in user**, I want to log out of my account, so that I can end my session securely.

### Favorites Feature

- **As a logged-in user**, I want to mark a restaurant as a favorite, so that I can easily find it later.
- **As a logged-in user**, I want to view a list of my favorite places, so that I can quickly access the restaurants I like.
- **As a logged-in user**, I want to remove a restaurant from my favorites, so that I can update my preferences.

### Interactive Map

- **As a user**, I want to explore an interactive map of the +15 Skywalk, so that I can understand how the walkways connect across downtown.
- **As a user**, I want to see restaurants displayed on the map, so that I can plan where to go.

### Hospitality Directory

- **As a user**, I want to see a list of restaurants and hospitality venues, so that I can choose where to eat or relax.
- **As a user**, I want to click on a restaurant and view more information (e.g., hours, location, summary), so that I can decide if it meets my needs.

### Events & News

- **As a user**, I want to browse a list of events happening along or near the +15 network, so that I can plan my visit around activities.
- **As a user**, I want to read news updates related to the +15 (e.g., closures, new businesses), so that I stay informed.

---

## API Endpoints

### News Endpoints

```js
/**
 * @route GET /api/news
 * @description Get all news posts with optional filters
 * @query {page, limit, search, tag, sort}
 * @access Public
 */

/**
 * @route GET /api/news/:slug
 * @description Get single news post by slug
 * @access Public
 */

/**
 * @route POST /api/news
 * @description Create a new news post
 * @body {title, description, image, tags, etc.}
 * @access Private
 */

/**
 * @route PUT /api/news/:id
 * @description Update an existing news post
 * @body {title, description, image, tags, etc.}
 * @access Private
 */

/**
 * @route DELETE /api/news/:id
 * @description Delete a news post by ID
 * @access Private
 */
```

### Events Endpoints

```js
/**
 * @route GET /api/events
 * @description Get all events with optional filters
 * @query {page, limit, search, category, sort}
 * @access Public
 */

/**
 * @route GET /api/events/:slug
 * @description Get single event by slug
 * @access Public
 */

/**
 * @route POST /api/events
 * @description Create a new event
 * @body {title, description, date, location, etc.}
 * @access Private
 */

/**
 * @route PUT /api/events/:id
 * @description Update an existing event
 * @body {title, description, date, location, etc.}
 * @access Private
 */

/**
 * @route DELETE /api/events/:id
 * @description Delete an event by ID
 * @access Private
 */
```

### Restaurants Endpoints

```js
/**
 * @route GET /api/restaurants
 * @description Get all restaurants with optional filters
 * @query {page, limit, search, rating, sort}
 * @access Public
 */

/**
 * @route GET /api/restaurants/:slug
 * @description Get single restaurant by slug
 * @access Public
 */

/**
 * @route POST /api/restaurants
 * @description Create a new restaurant
 * @body {name, description, rating, image, etc.}
 * @access Private
 */

/**
 * @route PUT /api/restaurants/:id
 * @description Update an existing restaurant
 * @body {name, description, rating, image, etc.}
 * @access Private
 */

/**
 * @route DELETE /api/restaurants/:id
 * @description Delete a restaurant by ID
 * @access Private
 */
```

### Authentication Endpoints

```js
/**
 * @route POST /api/auth/signup
 * @description Create a new user account
 * @body {email, password}
 * @access Public
 */

/**
 * @route POST /api/auth/signin
 * @description Log in with email and password
 * @body {email, password}
 * @access Public
 */

/**
 * @route GET /api/auth/me
 * @description Get current authenticated user info
 * @access Private
 */
```

## Entity Relationship Diagram

![Entity Relationship Diagram](erd-diagram.png)
