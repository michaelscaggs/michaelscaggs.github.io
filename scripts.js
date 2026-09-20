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
 * 5. Dynamic data-driven marquee engine with nameplate updates
 * ==========================================================================
 */
function initMarqueeEngine() {
  const marqueeContainer = document.getElementById("marqueeContent");
  const nameplateContainer = document.getElementById("marqueeNameplate");

  if (!marqueeContainer || !nameplateContainer) return;

  // Helper function to fetch the real-time theme state
  function getIsLightMode() {
    return document.documentElement.getAttribute('data-theme') === 'light' || 
           window.matchMedia('(prefers-color-scheme: light)').matches;
  }

  // Raw feed data configuration array
  const newsFeed = [
    { 
        type: "CRITICAL", 
        label: "BREAKING NEWS", 
        colors: { dark: "#e31837", light: "#5a1414" }, // Deep Red / Bright Red Alert
        textColors: { dark: "#ffb612", light: "#ffb612" }, // Customized text colors
        text: "🚨 Watch this space for breaking headlines." 
    },
    { 
        type: "SYSTEM", 
        label: "SYSTEM STATUS", 
        colors: { dark: "#2d9966", light: "#1e6b45" }, // Vivid Green / Dark Forest Green
        textColors: { dark: "#ffffff", light: "#000000" }, // Customized text colors
        text: "🖥️ System online with no known errors." 
    },
    { 
        type: "ANNOUNCE", 
        label: "ANNOUNCEMENTS", 
        colors: { dark: "#2d9966", light: "#1e6b45" }, // Vivid Green / Dark Forest Green
        textColors: { dark: "#ffffff", light: "#000000" }, // Customized text colors
        text: "🚧 This site is still under construction. Change is to be expected." 
    }
  ];

    // ==========================================================================
    // ADDED: Configurable Date and Time Range Injection Engine
    // ==========================================================================
    const nowTime = new Date();
    
    // CONFIGURE YOUR EVENT SCHEDULE HERE (Format: YYYY-MM-DDTHH:MM:SS)
    const eventConfig = {
        start: "2026-09-13T08:00:00", // Start Date & Time
        end:   "2026-09-18T23:59:59", // End Date & Time
        label: "NETWORK LOCKDOWN",
        text:  "📅 Network Lockdown in effect for new parser installation and testing.",
        colors: { dark: "#0056b3", light: "#cce5ff" },      // Theme colors
        textColors: { dark: "#ffffff", light: "#004085" }  // Theme text colors
    };

    const startDate = new Date(eventConfig.start);
    const endDate = new Date(eventConfig.end);

    // Validate dates and verify if the user's current time falls within the window
    if (!isNaN(startDate) && !isNaN(endDate) && nowTime >= startDate && nowTime <= endDate) {
        newsFeed.push({
            type: "SCHEDULED",
            label: eventConfig.label,
            colors: eventConfig.colors,
            textColors: eventConfig.textColors,
            text: eventConfig.text
        });
    }

    // ==========================================================================
    // ADDED: Inject dynamic item based on the day of the week
    // ==========================================================================
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayName = daysOfWeek[new Date().getDay()];
    
    // Customize your messages per day here
    let daySpecificText = ` Happy ${currentDayName}! Make it a great day.`;
    if (currentDayName === "Monday") {
        daySpecificText = "😂 There's a book called 'Ten Miles to the Outhouse'";
    } else if (currentDayName === "Tuesday") {
        daySpecificText = "😂 What is an algorithim?";
    } else if (currentDayName === "Wednesday") {
        daySpecificText = "😂 What's the best way to watch a fly fishing tournament?";
    } else if (currentDayName === "Thursday") {
        daySpecificText = "😂 Nice people don't have to learn about fractions.";
    } else if (currentDayName === "Friday") {
        daySpecificText = "😂 Not even going to joke about this. Today is 9-25.";
      } else if (currentDayName === "Saturday") {
        daySpecificText = "😂 What do you call the bouncer at a tea shop?";
    } else if (currentDayName === "Sunday") {
        daySpecificText = "😂 I'm reading a book about a couple of insects who fall in love in an Italian city.";
  };
  
    // Customize your messages per day here
    let daySpecificText2 = ` Happy ${currentDayName}! Make it a great day.`;
    if (currentDayName === "Monday") {
        daySpecificText2 = "😂 Author: Willie Maykit";
    } else if (currentDayName === "Tuesday") {
        daySpecificText2 = "😂 A groove laid down by a former Vice President.";
    } else if (currentDayName === "Wednesday") {
        daySpecificText2 = "😂 Live stream.";
    } else if (currentDayName === "Thursday") {
        daySpecificText2 = "😂 Because they're whole sum folk.";
    } else if (currentDayName === "Friday") {
        daySpecificText2 = "😂 It's enough to drive you crazy if you let it.";
      } else if (currentDayName === "Saturday") {
        daySpecificText2 = "😂 Securi-tea.";
    } else if (currentDayName === "Sunday") {
        daySpecificText2 = "😂 It's a Rome-ants novel.";
  }
    
    // Push the first dynamic option into the active feed array
    newsFeed.push({
        type: "DAILY", 
        label: "DAILY DAD JOKE", 
        colors: { dark: "#4a4a4a", light: "#d3d3d3" }, 
        textColors: { dark: "#ffffff", light: "#000000" }, 
        text: daySpecificText
    });

    // Push the second dynamic option into the active feed array
    newsFeed.push({
        type: "DAILY", 
        label: "DAILY DAD JOKE", 
        colors: { dark: "#4a4a4a", light: "#d3d3d3" }, 
        textColors: { dark: "#ffffff", light: "#000000" }, 
        text: daySpecificText2
    });


  // ==========================================================================

  let currentIndex = 0;
  const holdDuration = 4500;    
  const animationBuffer = 500;  

  function createMarqueeNode(textString) {
      const span = document.createElement("span");
      span.className = "marquee-node";
      span.textContent = textString;
      return span;
  }

  // UPDATED: Factory now accepts and applies a txtColor parameter
  function createNameplateNode(labelText, bgBgColor, txtColor) {
      const div = document.createElement("div");
      div.className = "nameplate-node";
      div.style.backgroundColor = bgBgColor;
      div.style.color = txtColor; // Sets text color
      div.textContent = labelText;
      return div;
  }

  // Core tracking configurations
  let currentItem = newsFeed[currentIndex];
  let currentNode = createMarqueeNode(currentItem.text);
  
  // Draw the initial active frame using runtime colors
  let isLightInit = getIsLightMode();
  let initialBgColor = isLightInit ? currentItem.colors.light : currentItem.colors.dark;
  let initialTxtColor = isLightInit ? currentItem.textColors.light : currentItem.textColors.dark;
  
  let currentNameplateNode = createNameplateNode(currentItem.label, initialBgColor, initialTxtColor);
  
  nameplateContainer.replaceChildren(currentNameplateNode);
  currentNameplateNode.classList.add("enter");
  marqueeContainer.appendChild(currentNode);
  
  void currentNode.offsetWidth;
  currentNode.classList.add("enter");

  // Continuous timed cycle handler logic 
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

              // Roll in a brand new nameplate node with background AND text color mapped
              currentNameplateNode = createNameplateNode(currentItem.label, targetBgColor, targetTxtColor);
              nameplateContainer.appendChild(currentNameplateNode);
              
              void currentNameplateNode.offsetWidth;
              currentNameplateNode.classList.add("enter");
          } else {
              // Static Update: Update content and design parameters without rolling
              currentNameplateNode.textContent = currentItem.label;
              currentNameplateNode.style.backgroundColor = targetBgColor;
              currentNameplateNode.style.color = targetTxtColor; // Update text color dynamically
          }

          currentNode = createMarqueeNode(currentItem.text);
          marqueeContainer.appendChild(currentNode);

          void currentNode.offsetWidth;
          currentNode.classList.add("enter");

      }, animationBuffer);
  }

  // Initialize loop cadence engine parameters
  setInterval(cycleNewsFeed, holdDuration + animationBuffer);

  // UPDATED: Theme watcher now re-binds text color immediately if flipped mid-cycle
  const themeObserver = new MutationObserver(() => {
    if (!currentNameplateNode) return;
    const isLight = getIsLightMode();
    const updatedBgColor = isLight ? currentItem.colors.light : currentItem.colors.dark;
    const updatedTxtColor = isLight ? currentItem.textColors.light : currentItem.textColors.dark;
	currentNameplateNode.style.backgroundColor = updatedBgColor;
	currentNameplateNode.style.color = updatedTxtColor; // Immediate text color update
	});
	
	themeObserver.observe(document.documentElement, {
	attributes: true,
	attributeFilter: ['data-theme']
	});
	}    

/**
 * ==========================================================================
 * 6. Page Refresh Timer
 * ==========================================================================
 */
 function setRefreshTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            document.getElementById('refresh-time').textContent = timeString;
        }
        
        // Execute the function
        setRefreshTime();

/*
 * ==========================================================================
 * 7. Combined Banner & Watermark Schedule Control
 * ==========================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Holiday Watermark Schedule Constraints
  const WATERMARK_START = new Date("2026-09-19T00:00:00");   
  const WATERMARK_END   = new Date("2026-09-19T23:59:59"); 

  // 2. Network Lockdown Schedule Constraints
  const startTime  = new Date("2026-11-22T00:00:00");
  const endTime    = new Date("2026-11-30T23:59:59");

  function checkActiveSchedules() {
    const now = new Date();

    // --- Process Holiday Watermark Event ---
    const watermarkElement = document.getElementById("iframeWatermark");
    if (watermarkElement) {
      if (now >= WATERMARK_START && now <= WATERMARK_END) {
        watermarkElement.classList.remove("watermark-hidden");
      } else {
        watermarkElement.classList.add("watermark-hidden");
      }
    }

    // --- Process Network Lockdown Event ---
    const lockdownElement = document.getElementById("local-timed-banner");
    if (lockdownElement) {
      if (now >= startTime && now <= endTime) {
        lockdownElement.style.display = "block";
      } else {
        lockdownElement.style.display = "none";
      }
    }
  }

  // Run immediately on page load
  checkActiveSchedules();

  // Check every 60 seconds for live page instances
  setInterval(checkActiveSchedules, 60000);
});
