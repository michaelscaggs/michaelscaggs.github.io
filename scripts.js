/*
==========================================================================
1. Initialize Event Listeners & State
==========================================================================
*/
document.addEventListener("DOMContentLoaded", () => {
    initClockSystem();
    initNavigationMenu();
    initNavigationLinks();
    initIframeController();
    initThemeEngine();
    initMarqueeEngine();
  }
);

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
    }
  );
  function updateToggleIcon(theme) {
    if (!themeIcon) return;
// Swap emoji icons visually based on target active state
    themeIcon.textContent = theme === "light" ? "☀️" : "🌙";
  }
}

/*
==========================================================================
2. Live World Clock System
==========================================================================
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

/*
==========================================================================
 3. Multi-Level Menu Layout Expansion
==========================================================================
*/
function initNavigationMenu() {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
    if (!sidebar || !menuToggle) return;

// Toggle menu state layout flags
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        sidebar.classList.toggle("expanded");
    }
  );

// Close sidebar drawer cleanly when an external layout section is clicked
    document.addEventListener("click", (e) => {
// Prevent immediate close firing if the user clicks inside the sidebar or on the toggle button
      if (sidebar.classList.contains("expanded") && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        sidebar.classList.remove("expanded");
      }
    }
  );
}

/*
==========================================================================
4. Content Area Iframe Controller
==========================================================================
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

/*
==========================================================================
5. Dynamic data-driven marquee engine with nameplate updates
==========================================================================
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
    },
  	{ 
		  type: "LYRIC", 
		  label: "MANDATORY METALLICA", 
		  colors: { dark: "#ffd500", light: "#ffcc00" }, 
		  textColors: { dark: "#000000", light: "#000000" }, 
		  text: "All sinners a future, all Saints a past." 
		},
		{ 
		  type: "LYRIC", 
		  label: "MANDATORY METALLICA", 
		  colors: { dark: "#ffd500", light: "#ffcc00" }, 
		  textColors: { dark: "#000000", light: "#000000" }, 
		  text: "How can I be lost, if I've got nowhere to go?" 
		},
		{ 
		  type: "LYRIC", 
		  label: "MANDATORY METALLICA", 
		  colors: { dark: "#ffd500", light: "#ffcc00" }, 
		  textColors: { dark: "#000000", light: "#000000" }, 
		  text: "Isolate and fight your mind, tellin' you you're left behind." 
		},
		{ 
		  type: "LYRIC", 
		  label: "MANDATORY METALLICA", 
		  colors: { dark: "#ffd500", light: "#ffcc00" }, 
		  textColors: { dark: "#000000", light: "#000000" }, 
		  text: "...and when you see me strut, remind me of what left this outlaw torn." 
		},
  ];

// ==========================================================================
// ADDED: Configurable Date and Time Range Injection Engine (Multi-Event)
// ==========================================================================
const nowTime = new Date();

// CONFIGURE YOUR EVENT SCHEDULE HERE (Format: YYYY-MM-DDTHH:MM:SS)
const eventConfigs = [
  {
    start: "2026-10-22T05:30:00", // Start Date & Time
    end:   "2026-10-22T07:29:59", // End Date & Time
    label: "NETWORK LOCKDOWN",
    text:  "📅 Network Lockdown in effect for new parser installation and testing.",
    colors: { dark: "#0056b3", light: "#cce5ff" },      // Theme colors
    textColors: { dark: "#ffffff", light: "#004085" }  // Theme text colors
  },
  {
    start: "2026-10-22T07:30:00", // Start Date & Time
    end:   "2026-10-22T07:59:59", // End Date & Time
    label: "NETWORK LOCKDOWN",
    text:  "📅 Parser installation complete. All systems confirmed operational.",
    colors: { dark: "#0056b3", light: "#cce5ff" },      // Theme colors
    textColors: { dark: "#ffffff", light: "#004085" }  // Theme text colors
  },
];

// Loop through each event config and inject active ones into the news feed
eventConfigs.forEach(event => {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);

// Validate dates and verify if the user's current time falls within the window
  if (!isNaN(startDate) && !isNaN(endDate) && nowTime >= startDate && nowTime <= endDate) {
    newsFeed.push({
      type: "SCHEDULED",
      label: event.label,
      colors: event.colors,
      textColors: event.textColors,
      text: event.text
    });
  }
});

// ==========================================================================
// ADDED: Inject dynamic item based on the day of the week
// ==========================================================================
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayName = daysOfWeek[new Date().getDay()];
    
// Customize your messages per day here
    let daySpecificText = ` Happy ${currentDayName}! Make it a great day.`;
      if (currentDayName === "Monday") {
          daySpecificText = "😂 A photon goes to a hotel, the bellhop offers to take his luggage.";
      } else if (currentDayName === "Tuesday") {
          daySpecificText = "😂 If your spouse can't ever make a decent pot of coffee...";
      } else if (currentDayName === "Wednesday") {
          daySpecificText = "😂 My wife suggested that I should do some lunges to start working out.";
      } else if (currentDayName === "Thursday") {
          daySpecificText = "😂 I saw a DeLorean for sale the other day.";
      } else if (currentDayName === "Friday") {
          daySpecificText = "😂 Scientists started to cross-breed a leopard and a crab.";
      } else if (currentDayName === "Saturday") {
          daySpecificText = "😂 My favorite part of having to interrogate a duck?";
      } else if (currentDayName === "Sunday") {
          daySpecificText = "😂 My dad got lost in the fog.";
      }
    let daySpecificText2 =  ` Happy ${currentDayName}! Make it a great day.`;
      if (currentDayName === "Monday") {
          daySpecificText2 = "😂 'No thanks' says the photon, 'I'm travelling light.'";
      } else if (currentDayName === "Tuesday") {
          daySpecificText2 = "😂 Is that grounds for divorce?";
      } else if (currentDayName === "Wednesday") {
          daySpecificText2 = "😂 She told me it would be a huge step forward.";
      } else if (currentDayName === "Thursday") {
          daySpecificText2 = "😂 The ad read: Low mileage, only driven from time to time.";
      } else if (currentDayName === "Friday") {
          daySpecificText2 = "😂 They stopped when they realized it could go sideways fast.";
      } else if (currentDayName === "Saturday") {
          daySpecificText2 = "😂 If you keep it up long enough, he'll quack.";
      } else if (currentDayName === "Sunday") {
          daySpecificText2 = "😂 He will be mist.";
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

/*
==========================================================================
6. Page Refresh Timer
==========================================================================
*/
function setRefreshTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
    document.getElementById('refresh-time').textContent = timeString;
  }
        
// Execute the function
setRefreshTime();

/*
==========================================================================
7. Combined Banner & Watermark Schedule Control
==========================================================================
*/
document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();

// ==========================================
// CONFIGURATION: Holiday Watermarks
// ==========================================
  const DEFAULT_IMG_SRC = "cmanalogo.svg";

  const HOLIDAY_SCHEDULES = [
    {
      name: "Thanksgiving",
      start: new Date("2026-10-22T00:00:00"),
      end: new Date("2026-11-26T23:59:59"),
      imgSrc: "snoopy.jpg"
    },
    {
      name: "Christmas Eve & Day",
      start: new Date("2026-12-24T00:00:00"),
      end: new Date("2026-12-25T23:59:59"),
      imgSrc: "snow.png"
    },
    {
      name: "New Year",
      start: new Date("2026-12-31T00:00:00"),
      end: new Date("2027-01-01T23:59:59"),
      imgSrc: "happynewyear1.gif"
    }
  ];

// ==========================================
// CONFIGURATION: Network Lockdowns
// ==========================================
  const LOCKDOWN_SCHEDULES = [
    {
      name: "Q4 Change Freeze (Thanksgiving)",
      start: new Date("2026-11-22T00:00:00"),
      end: new Date("2026-11-30T23:59:59")
    },
    {
      name: "EOY Change Freeze (Christmas/New Year)",
      start: new Date("2026-12-18T00:00:00"),
      end: new Date("2027-01-04T23:59:59")
    }
  ];

// ==========================================
// CONTROL LOGIC
// ==========================================
  function checkActiveSchedules() {
    
// --- 1. Process Holiday Watermark Event ---
    const watermarkElement = document.getElementById("iframeWatermark");
    
    if (watermarkElement) {
      const watermarkImg = watermarkElement.querySelector("img");
      const activeHoliday = HOLIDAY_SCHEDULES.find(holiday => now >= holiday.start && now <= holiday.end);

      if (activeHoliday) {
        if (watermarkImg) watermarkImg.src = activeHoliday.imgSrc;
        watermarkElement.classList.remove("watermark-hidden");
      } else {
        if (watermarkImg) watermarkImg.src = DEFAULT_IMG_SRC;
        watermarkElement.classList.add("watermark-hidden");
      }
    }
    
// --- 2. Process Network Lockdown Event ---
    const activeLockdown = LOCKDOWN_SCHEDULES.find(lockdown => now >= lockdown.start && now <= lockdown.end);

    if (activeLockdown) {
      // Execute lockdown actions (e.g., displaying a warning banner, blocking UI inputs)
      console.warn(`System Status: Active Network Lockdown [${activeLockdown.name}]`);
      handleLockdownActivation(activeLockdown);
    } else {
      // Clear lockdown states if normal window
      handleLockdownDeactivation();
    }
  }

// --- Lockdown Helper Functions (Stubs for your implementation) ---
  function handleLockdownActivation(lockdown) {
// Add logic here to display your lockdown banners or inject warnings
// Example: document.getElementById("lockdownBanner").textContent = `${lockdown.name} is in effect.`;
  }

  function handleLockdownDeactivation() {
// Add logic here to hide your lockdown banners or reset restrictions
  }

// Run on initial load
  checkActiveSchedules();
});
