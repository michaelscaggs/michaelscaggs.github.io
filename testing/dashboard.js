/**
 * ==========================================================================
 * 1. Initialize Event Listeners & State
 * ==========================================================================
 **/
document.addEventListener("DOMContentLoaded", () => {
    initClockSystem();
    initNavigationMenu();
    initNavigationLinks();
    initIframeController();
    initThemeEngine();
    initMarqueeEngine();
    
    // Set the loaded timestamp field layout
    setRefreshTime();
    
    // Centralized Section 7 Execution Block
    checkActiveSchedules();
    setInterval(checkActiveSchedules, 60000); 
});

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
        themeIcon.textContent = theme === "light" ? "🌙" : "☀️";
    }
}

/**
 * ==========================================================================
 * 2. Live World Clock System
 * ==========================================================================
 **/
function initClockSystem() {
    const clockElements = {
        utc: document.getElementById("clock-utc"), 
        ast: document.getElementById("clock-ast"), 
        est: document.getElementById("clock-est"), 
        cst: document.getElementById("clock-cst"), 
        mst: document.getElementById("clock-mst"), 
        pst: document.getElementById("clock-pst"), 
        hst: document.getElementById("clock-hst")  
    };

    function updateClocks() {
        const now = new Date();

        const options = {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        };

        if (clockElements.utc) {
            clockElements.utc.textContent = now.toLocaleTimeString("en-US", { ...options, timeZone: "UTC" });
        }
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

    updateClocks();
    setInterval(updateClocks, 1000);
}


/**
 * ==========================================================================
 * 3. Multi-Level Menu Layout Expansion
 * ==========================================================================
 **/
function initNavigationMenu() {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");

    if (!sidebar || !menuToggle) return;

    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        sidebar.classList.toggle("expanded");
    });

    document.addEventListener("click", (e) => {
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
 **/
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
            if (sidebar && sidebar.classList.contains("expanded")) {
                sidebar.classList.remove("expanded");
            }
        });
    });
}

/**
 * ==========================================================================
 * 5. Dynamic data-driven marquee engine with nameplate updates (JSON-backed)
 * ==========================================================================
 **/
async function initMarqueeEngine() {
    const marqueeContainer = document.getElementById("marqueeContent");
    const nameplateContainer = document.getElementById("marqueeNameplate");
  
    if (!marqueeContainer || !nameplateContainer) return;
  
    function getIsLightMode() {
      return document.documentElement.getAttribute('data-theme') === 'light' || 
             window.matchMedia('(prefers-color-scheme: light)').matches;
    }

    let newsFeed = [];
    
    try {
        const response = await fetch('marquee.json');
        if (!response.ok) throw new Error('Failed to fetch marquee configuration.');
        const data = await response.json();
        
        // Load base news items
        newsFeed = [...data.newsFeed];
        
        // Evaluate dynamic scheduled event injection from JSON configuration
        const nowTime = new Date();
        const eventConfig = data.eventConfig;
        
        if (eventConfig) {
            const startDate = new Date(eventConfig.start);
            const endDate = new Date(eventConfig.end);

            if (!isNaN(startDate) && !isNaN(endDate) && nowTime >= startDate && nowTime <= endDate) {
                newsFeed.push({
                    type: "SCHEDULED",
                    label: eventConfig.label,
                    colors: eventConfig.colors,
                    textColors: eventConfig.textColors,
                    text: eventConfig.text
                });
            }
        }
        
        // Evaluate day specific dad joke text assets cleanly
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currentDayName = days[nowTime.getDay()];
        
        let daySpecificText = ` Happy ${currentDayName}! Make it a great day.`;
        let daySpecificText2 =  ` Happy ${currentDayName}! Make it a great day.`;
        
        if (currentDayName === "Monday") {
            daySpecificText = "😂 How do you fix a broken pumpkin?";
            daySpecificText2 = "😂 With a pumpkin patch.'";
        } else if (currentDayName === "Tuesday") {
            daySpecificText = "😂 I used to love chopping wood.";
            daySpecificText2 = "😂 But now it gives me a splitting headache.";
        } else if (currentDayName === "Wednesday") {
            daySpecificText = "😂 Very few people talk about the benefits of eating grapes.";
            daySpecificText2 = "😂 It's all about raisin awareness.";
        } else if (currentDayName === "Thursday") {
            daySpecificText = "😂 I love going outdoors.";
            daySpecificText2 = "😂 It's safer than going out windows.";
        } else if (currentDayName === "Friday") {
            daySpecificText = "😂 How did Jesus do on his final exam?";
            daySpecificText2 = "😂 He nailed it.";
        } else if (currentDayName === "Saturday") {
            daySpecificText = "😂 What should you do if you are attacked by a group of clowns.";
            daySpecificText2 = "😂 Go straight for the juggler.";
        } else if (currentDayName === "Sunday") {
            daySpecificText = "😂 I just found out that I am colorblind.";
            daySpecificText2 = "😂 It really came out of the purple.";
        }

        newsFeed.push({
            type: "DAILY",
            label: "DAILY DAD JOKE",
            colors: { dark: "#4a4a4a", light: "#d3d3d3" },
            textColors: { dark: "#ffffff", light: "#000000" },
            text: daySpecificText
        });

        newsFeed.push({
            type: "DAILY",
            label: "DAILY DAD JOKE",
            colors: { dark: "#4a4a4a", light: "#d3d3d3" },
            textColors: { dark: "#ffffff", light: "#000000" },
            text: daySpecificText2
        });
        
    } catch (error) {
        console.error("Marquee initialization error:", error);
        return; // Halt engine if asset extraction completely fails
    }

    if (newsFeed.length === 0) return;

    let currentIndex = 0;
    const holdDuration = 4500;
    const animationBuffer = 500;

    function createMarqueeNode(textString) {
        const span = document.createElement("span");
        span.className = "marquee-node";
        span.textContent = textString;
        return span;
    }

    function createNameplateNode(labelText, bgBgColor, txtColor) {
        const div = document.createElement("div");
        div.className = "nameplate-node";
        div.style.backgroundColor = bgBgColor;
        div.style.color = txtColor;
        div.textContent = labelText;
        return div;
    }

    let currentItem = newsFeed[currentIndex];
    let currentNode = createMarqueeNode(currentItem.text);
    let isLightInit = getIsLightMode();
    let initialBgColor = isLightInit ? currentItem.colors.light : currentItem.colors.dark;
    let initialTxtColor = isLightInit ? currentItem.textColors.light : currentItem.textColors.dark;
    let currentNameplateNode = createNameplateNode(currentItem.label, initialBgColor, initialTxtColor);
    
    nameplateContainer.replaceChildren(currentNameplateNode);
    currentNameplateNode.classList.add("enter");
    marqueeContainer.appendChild(currentNode);
    void currentNode.offsetWidth;
    currentNode.classList.add("enter");

    function cycleNewsFeed() {
        const previousItem = currentItem;
        currentIndex = (currentIndex + 1) % newsFeed.length;
        currentItem = newsFeed[currentIndex];
        const isTypeChanging = previousItem.type !== currentItem.type;
        currentNode.classList.remove("enter");
        currentNode.classList.add("exit");
        const nodeToTrash = currentNode;
        let nameplateToTrash = null;
        if (isTypeChanging) {
            currentNameplateNode.classList.remove("enter");
            currentNameplateNode.classList.add("exit");
            nameplateToTrash = currentNameplateNode;
        }
        setTimeout(() => {
            nodeToTrash.remove();
            const isLight = getIsLightMode();
            const targetBgColor = isLight ? currentItem.colors.light : currentItem.colors.dark;
            const targetTxtColor = isLight ? currentItem.textColors.light : currentItem.textColors.dark;
            if (isTypeChanging) {
                if (nameplateToTrash) nameplateToTrash.remove();
                currentNameplateNode = createNameplateNode(currentItem.label, targetBgColor, targetTxtColor);
                nameplateContainer.appendChild(currentNameplateNode);
                void currentNameplateNode.offsetWidth;
                currentNameplateNode.classList.add("enter");
            } else {
                currentNameplateNode.textContent = currentItem.label;
                currentNameplateNode.style.backgroundColor = targetBgColor;
                currentNameplateNode.style.color = targetTxtColor;
            }
            currentNode = createMarqueeNode(currentItem.text);
            marqueeContainer.appendChild(currentNode);
            void currentNode.offsetWidth;
            currentNode.classList.add("enter");
        }, animationBuffer);
    }
    
    setInterval(cycleNewsFeed, holdDuration + animationBuffer);
    
    const themeObserver = new MutationObserver(() => {
        if (!currentNameplateNode) return;
        const isLight = getIsLightMode();
        const updatedBgColor = isLight ? currentItem.colors.light : currentItem.colors.dark;
        const updatedTxtColor = isLight ? currentItem.textColors.light : currentItem.textColors.dark;
        currentNameplateNode.style.backgroundColor = updatedBgColor;
        currentNameplateNode.style.color = updatedTxtColor;
    });
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}
/**
* ==========================================================================
* 	6. Page Refresh Timer
* ==========================================================================
**/
function setRefreshTime(overrideDate = null) {
    const refreshElement = document.getElementById('refresh-time');
    if (!refreshElement) return;

    let targetTime;
    
    // Check if an explicit timestamp was passed into the function first
    if (overrideDate instanceof Date && !isNaN(overrideDate)) {
        targetTime = overrideDate;
    } else {
        // Fall back to checking the Section 8 cache-busting URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const refreshTimestamp = urlParams.get('refresh_ts');

        if (refreshTimestamp && !isNaN(refreshTimestamp)) {
            targetTime = new Date(parseInt(refreshTimestamp, 10));
        } else {
            targetTime = new Date();
        }
    }

    // Render the formatted time precisely onto the page layout
    refreshElement.textContent = targetTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
}
/**
* ==========================================================================
* 	7. Combined Banner & Watermark Schedule Control
* ==========================================================================
**/
function checkActiveSchedules() {
const now = new Date();const WATERMARK_START = new Date("2026-11-26T00:00:00");
const WATERMARK_END   = new Date("2026-11-26T23:59:59");const startTime  = new Date("2026-11-22T00:00:00");
const endTime    = new Date("2026-11-30T23:59:59");const watermarkElement = document.getElementById("iframeWatermark");
	if (watermarkElement) {
		if (now >= WATERMARK_START && now <= WATERMARK_END) {
			watermarkElement.classList.remove("watermark-hidden");
				} else {
					watermarkElement.classList.add("watermark-hidden");
			}
		}const lockdownElement = document.getElementById("local-timed-banner");
	if (lockdownElement) {
		if (now >= startTime && now <= endTime) {
			lockdownElement.style.display = "block";
			} else {
			lockdownElement.style.display = "none";
			}
		}
	};
/**
* ==========================================================================
* 	8. Automatic Refresh Control
* ==========================================================================
 **/
setInterval(async () => {
    try {
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete('refresh_ts');

        const checkSession = await fetch(cleanUrl.toString(), { 
            method: 'HEAD',
            cache: 'no-store' 
        });
        
        // Capture the precise execution time of the background update engine
        const refreshMoment = new Date();
        const url = new URL(window.location.href);
        url.searchParams.set('refresh_ts', refreshMoment.getTime());

        if (checkSession.status === 503 || checkSession.status === 401) {
            console.warn("Session expired or authentication failed. Redirecting to login...");
            window.location.href = url.toString(); 
        } else {
            // 1. Silent URL update so a manual browser refresh maintains continuity
            window.history.replaceState(null, '', url.toString());

            // 2. Direct Reset: Force the layout label to instantly update on screen
            setRefreshTime(refreshMoment);
            
            console.log("Dashboard background data cycle refreshed successfully.");
        }
    } catch (error) {
        console.error("Network check failed, holding off on reload.", error);
    }
}, 1800000); // 30 minutes