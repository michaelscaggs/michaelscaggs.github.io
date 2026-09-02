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
        themeIcon.textContent = theme === "light" ? "🌙" : "☀️";
    }
}

/**
 * ==========================================================================
 * 2. Live World Clock System
 * ==========================================================================
 */
function initClockSystem() {
    const clockElements = {
        utc: document.getElementById("clock-utc"), // Universal Coordinated Time
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
        type: "FLOOR", 
        label: "FLOOR MANAGEMENT", 
        colors: { dark: "#00629b", light: "#005587" }, // Spectrum Blue / Deep Sea Blue
        textColors: { dark: "#002244", light: "#311d00" }, // Customized text colors
        text: "🔥 Remember to poke the routers to close resolved Y6 jobs hourly." 
    },
    { 
        type: "FLOOR", 
        label: "FLOOR MANAGEMENT", 
        colors: { dark: "#00629b", light: "#005587" }, // Spectrum Blue / Deep Sea Blue
        textColors: { dark: "#002244", light: "#311d00" }, // Customized text colors
        text: "🔥 Review Dan Ward tickets." 
    },
    { 
        type: "PROCESS", 
        label: "PROCESS REMINDER", 
        colors: { dark: "#2d9966", light: "#1e6b45" }, // Vivid Green / Dark Forest Green
        textColors: { dark: "#203731", light: "#ffb612" }, // Customized text colors
        text: "⚠️ Override for closure on repeat outages requires DFE or above approval." 
    },
    { 
        type: "PROCESS", 
        label: "PROCESS REMINDER", 
        colors: { dark: "#2d9966", light: "#1e6b45" }, // Vivid Green / Dark Forest Green
        textColors: { dark: "#203731", light: "#ffb612" }, // Customized text colors
        text: "⚠️ Check to make sure all related tickets are closed on fiber events." 
    },
    { 
        type: "NEWS", 
        label: "BREAKING NEWS", 
        colors: { dark: "#e31837", light: "#5a1414" }, // Deep Red / Bright Red Alert
        textColors: { dark: "#ffb612", light: "#ffb612" }, // Customized text colors
        text: "🚨 Nebraska Technicians need to reach out to ROC North for assistance. 866-967-7611" 
    },
    { 
        type: "NEWS", 
        label: "BREAKING NEWS", 
        colors: { dark: "#e31837", light: "#5a1414" }, // Deep Red / Bright Red Alert
        textColors: { dark: "#ffb612", light: "#ffb612" }, // Customized text colors
        text: "🚨 Louisiana has been transferred to ROC South. 844-220-2369" 
    },
    { 
        type: "CRITICAL", 
        label: "BREAKING NEWS", 
        colors: { dark: "#880808", light: "#b30000" }, // Deep Red / Bright Red Alert
        textColors: { dark: "#ffb612", light: "#ffb612" }, // Customized text colors
        text: "🚨 Area Realignment complete in Lighthouse and Remedy" 
    },
    { 
        type: "SPECIAL", 
        label: "AWARDS", 
        colors: { dark: "#2d9966", light: "#1e6b45" }, // Vivid Green / Dark Forest Green
        textColors: { dark: "#ffffff", light: "#000000" }, // Customized text colors
        text: "🏆 Congratulations to Julie Stiles on her Q2 Achievement Award." 
    },
    { 
        type: "SPECIAL", 
        label: "AWARDS", 
        colors: { dark: "#2d9966", light: "#1e6b45" }, // Vivid Green / Dark Forest Green
        textColors: { dark: "#ffffff", light: "#000000" }, // Customized text colors
        text: "🏆 Don't forget to send a SPARK for a job well done." 
    }
  ];

  // ==========================================================================
  // ADDED: Inject dynamic item based on the day of the week
  // ==========================================================================
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = daysOfWeek[new Date().getDay()];
  
  // Customize your messages per day here
  let daySpecificText = ` Happy ${currentDayName}! Make it a great day.`;
  if (currentDayName === "Monday") {
      daySpecificText = "😂 Insert Dad Joke Here";
  } else if (currentDayName === "Tuesday") {
      daySpecificText = "😂 Insert Dad Joke Here";
  } else if (currentDayName === "Wednesday") {
      daySpecificText = "😂 Insert Dad Joke Here";
  } else if (currentDayName === "Thursday") {
      daySpecificText = "😂 Insert Dad Joke Here";
  } else if (currentDayName === "Friday") {
      daySpecificText = "😂 Insert Dad Joke Here";
    } else if (currentDayName === "Saturday") {
      daySpecificText = "😂 Insert Dad Joke Here";
  } else if (currentDayName === "Sunday") {
      daySpecificText = "😂 Insert Dad Joke Here";
}

  // Push the dynamic option into the active feed array
  newsFeed.push({
      type: "DAILY", 
      label: "DAILY DAD JOKE", 
      colors: { dark: "#4a4a4a", light: "#d3d3d3" }, 
      textColors: { dark: "#ffffff", light: "#000000" }, 
      text: daySpecificText
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
