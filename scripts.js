/**
 * ==========================================================================
 * 1. Initialize Event Listeners & State
 * ==========================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
    initClockSystem();
    initNavigationMenu();
    initNavigationLinks();
    initIframeController();
    initThemeEngine();
    initMarqueeEngine();
});

// Add to your DOMContentLoaded event loop init list: initThemeEngine();

function initThemeEngine() {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle ? themeToggle.querySelector(".theme-icon") : null;
    
    if (!themeToggle) return;

    // Check system preference or cached setting from local storage
    const savedTheme = localStorage.getItem("dashboard-theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateToggleIcon(savedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        
        // Save choice state globally
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("dashboard-theme", newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        if (!themeIcon) return;
        // Swap emoji icons visually based on target active state
        themeIcon.textContent = theme === "light" ? "☀️" : "🌙";
    }
}

/**
 * ==========================================================================
 * 2. Live World Clock System
 * ==========================================================================
 */
function initClockSystem() {
    const clockElements = {
        ast: document.getElementById("clock-ast"), // Arizona Standard Time
        est: document.getElementById("clock-est"), // Eastern Standard Time
        cst: document.getElementById("clock-cst"), // Central Standard Time
        mst: document.getElementById("clock-mst"), // Mountain Standard Time
        pst: document.getElementById("clock-pst"), // Pacific Standard Time
        hst: document.getElementById("clock-hst")  // Hawaii Standard Time
    };

    function updateClocks() {
        const now = new Date();

        const options = {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        };

        // Render localized times using standardized geographic IANA strings
        if (clockElements.ast) {
            clockElements.ast.textContent = now.toLocaleTimeString("en-US", { ...options, timeZone: "America/Phoenix" });
        }
        if (clockElements.est) {
            clockElements.est.textContent = now.toLocaleTimeString("en-US", { ...options, timeZone: "America/New_York" });
        }
        if (clockElements.cst) {
            clockElements.cst.textContent = now.toLocaleTimeString("en-US", { ...options, timeZone: "America/Chicago" });
        }
        if (clockElements.mst) {
            clockElements.mst.textContent = now.toLocaleTimeString("en-US", { ...options, timeZone: "America/Denver" });
        }
        if (clockElements.pst) {
            clockElements.pst.textContent = now.toLocaleTimeString("en-US", { ...options, timeZone: "America/Los_Angeles" });
        }
        if (clockElements.hst) {
            clockElements.hst.textContent = now.toLocaleTimeString("en-US", { ...options, timeZone: "Pacific/Honolulu" });
        }
    }

    // Run clock immediately and frame every second
    updateClocks();
    setInterval(updateClocks, 1000);
}


/**
 * ==========================================================================
 * 3. Multi-Level Menu Layout Expansion
 * ==========================================================================
 */
function initNavigationMenu() {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");

    if (!sidebar || !menuToggle) return;

    // Toggle menu state layout flags
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        sidebar.classList.toggle("expanded");
    });

    // Close sidebar drawer cleanly when an external layout section is clicked
    document.addEventListener("click", (e) => {
        // Prevent immediate close firing if the user clicks inside the sidebar or on the toggle button
        if (sidebar.classList.contains("expanded") && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove("expanded");
        }
    });
}


/**
 * ==========================================================================
 * 4. Content Area Iframe Controller
 * ==========================================================================
 */
function initIframeController() {
    const contentFrame = document.getElementById("contentFrame");
    const structuralTriggers = document.querySelectorAll(".iframe-trigger");
    const sidebar = document.getElementById("sidebar");

    structuralTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            
            const targetUrl = trigger.getAttribute("href");
            if (contentFrame && targetUrl) {
                contentFrame.src = targetUrl;
            }

            // Clean up sidebar interface state after a navigation click
            if (sidebar) {
                sidebar.classList.remove("expanded");
            }
        });
    });
}

function initNavigationLinks() {
    const structuralTriggers = document.querySelectorAll(".new-tab-trigger");
    const sidebar = document.getElementById("sidebar");

    structuralTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            // Native browser mechanics will handle opening target="_blank" in a new tab.
            
            // Clean up the sidebar interface state by automatically collapsing the drawer
            if (sidebar && sidebar.classList.contains("expanded")) {
                sidebar.classList.remove("expanded");
            }
        });
    });
}

/**
 * ==========================================================================
 * 5. Dynamic Data-Driven Marquee Engine with Nameplate Updates
 * ==========================================================================
 */
function initMarqueeEngine() {
    const marqueeContainer = document.getElementById("marqueeContent");
    const nameplateContainer = document.getElementById("marqueeNameplate");
    if (!marqueeContainer || !nameplateContainer) return;

    // Structured data grid pairing labels, icons, alerts, and system colors
    const newsFeed = [
        {
            type: "NORMAL",
            label: "SYSTEM ONLINE",
            color: "#10b981", // Emerald green theme color
            text: "ℹ️ All remote servers operational and reporting healthy."
        },
        {
            type: "SUCCESS",
            label: "BACKUP COMPLETE",
            color: "#06b6d4", // Cyan theme color
            text: "💾 Critical structural database tables synced successfully to cloud nodes."
        },
        {
            type: "WARNING",
            label: "MAINTENANCE",
            color: "#f59e0b", // Amber warning color
            text: "⚠️ Core system maintenance window scheduled tonight at 04:00 UTC."
        },
        {
            type: "CRITICAL",
            label: "ALERT ACTIVE",
            color: "#ef4444", // Deep red color accent
            text: "🚨 High data traffic spike observed on Western Europe proxy cluster."
        }
    ];

    let currentIndex = 0;
    const holdDuration = 4500;    // Time text remains static in center view (ms)
    const animationBuffer = 500;  // Match time length for CSS layout keyframes (ms)

    // Helper generation factory to build custom text span elements
    function createMarqueeNode(textString) {
        const span = document.createElement("span");
        span.className = "marquee-node";
        span.textContent = textString;
        return span;
    }

    // Target configuration settings object for the initial baseline item
    let currentItem = newsFeed[currentIndex];
    let currentNode = createMarqueeNode(currentItem.text);
    
    // Inject first state values into the UI elements instantly on panel load
    nameplateContainer.textContent = currentItem.label;
    nameplateContainer.style.backgroundColor = currentItem.color;
    marqueeContainer.appendChild(currentNode);
    
    // Force a DOM engine layout reflow layout flush to trigger the entry animations
    void currentNode.offsetWidth;
    currentNode.classList.add("enter");

    // Continuous timed cycle handler logic 
    function cycleNewsFeed() {
        // Step 1: Fire off horizontal exit transition script rules on the current active item
        currentNode.classList.remove("enter");
        currentNode.classList.add("exit");

        const nodeToTrash = currentNode;

        // Advance array index cursor tracking position
        currentIndex = (currentIndex + 1) % newsFeed.length;
        currentItem = newsFeed[currentIndex];

        // Step 2: Hold script processing until the exit animation finishes cleanly
        setTimeout(() => {
            // Drop old node out of memory layout to keep performance running optimally
            nodeToTrash.remove();

            // Swap out nameplate label text and update background design parameters matching data config
            nameplateContainer.textContent = currentItem.label;
            nameplateContainer.style.backgroundColor = currentItem.color;

            // Instantly spawn upcoming ticker line text entry instance 
            currentNode = createMarqueeNode(currentItem.text);
            marqueeContainer.appendChild(currentNode);

            // Frame vertical scroll animation entry transition layer parameters
            void currentNode.offsetWidth;
            currentNode.classList.add("enter");

        }, animationBuffer);
    }

    // Schedule recursive loop interval engine paths continuously
    setInterval(cycleNewsFeed, holdDuration + animationBuffer);
}
