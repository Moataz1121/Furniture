import { useEffect } from 'react';

const Scripts = () => {
  useEffect(() => {
    const scriptUrls = [
      "/assets/vendor/libs/jquery/jquery.js",
      "/assets/vendor/libs/popper/popper.js",
      "/assets/vendor/js/bootstrap.js",
      "/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js",
      "/assets/vendor/js/menu.js",
      "/assets/vendor/libs/apex-charts/apexcharts.js",
      "/assets/js/main.js",
      "/assets/js/dashboards-analytics.js"
    ];

    scriptUrls.forEach(url => {
      const script = document.createElement('script');
      script.src = url;
      script.async = false;  // Change this if needed
      document.body.appendChild(script);
    });

    // External script with async defer
    const githubButtonScript = document.createElement('script');
    githubButtonScript.src = "https://buttons.github.io/buttons.js";
    githubButtonScript.async = true;
    githubButtonScript.defer = true;
    document.body.appendChild(githubButtonScript);

    return () => {
      // Cleanup the scripts when the component unmounts
      document.querySelectorAll('script').forEach(script => {
        if (scriptUrls.includes(script.src) || script.src === "https://buttons.github.io/buttons.js") {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  return null; // Since we don't need to render anything
};

export default Scripts;
