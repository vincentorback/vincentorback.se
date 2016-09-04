<?php $asd = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '' ?>

<!doctype html>
<html class="Site no-js" lang="en">
<head prefix="og: http://ogp.me/ns#">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <link href="https://fonts.googleapis.com/css?family=Roboto:300,500" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/style.css">

  <meta name="robots" content="noindex">

  <title>404 | Vincent Orback - Web designer and developer in Stockholm</title>
  <meta name="keywords" content="web designer, web developer, front-end, portfolio, stocholm">

  <link rel="author" href="https://plus.google.com/+VincentorbackSe">
  <meta property="og:title" content="Vincent Orback - Web designer and developer">
  <meta property="og:description" content="Web designer and front-end developer in Stockholm, Sweden. I make functional and aesthetically attractive responsive websites :)">
  <meta property="og:url" content="http://vincentorback.se">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Vincent Orback">
  <meta property="og:locale" content="en_US">
  <meta property="og:image" content="http://vincentorback.se/assets/images/share.jpg">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@vorback">
  <meta name="twitter:creator" content="@vorback">
  <meta name="twitter:image" content="http://vincentorback.se/assets/images/share-twitter.jpg">
  <meta name="twitter:image:width" content="560">
  <meta name="twitter:image:height" content="750">

  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
  <link rel="manifest" href="/manifest.json">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#757575">
  <meta name="theme-color" content="#ffffff">

  <script>
  if (!(window.doNotTrack === '1' || window.doNotTrack === 'yes' || navigator.doNotTrack === 'yes' || navigator.doNotTrack === '1' || navigator.msDoNotTrack === '1')) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    // ga('create', 'UA-31135100-1', 'auto');
    // ga('send', 'pageview');
    ga('send', {
      'hitType': 'event',
      'eventCategory': '404',
      'eventAction': 'error',
      'eventValue': '<?php echo $asd; ?>'
    });
  }
  </script>
</head>

<body class="Site-body">

  <header class="Head" role="banner">
    <div class="Site-container">
      <div class="Head-inner">
        <a class="Head-logo js-pageTransition" href="/">
          <h1 class="Head-logoTitle">Vincent Orback</h1>
        </a>
        <nav class="Head-nav" role="navigation">
          <ul class="Head-navList">
            <li class="Head-navItem">
              <a class="Head-navLink Link js-pageTransition js-aboutLink" href="/about-me" rel="next">
                <span class="Link-inner">About <span class="u-hideSmall">me</span></span>
              </a>
            </li>
            <!-- <li class="Head-navItem">
              <a class="Head-navLink Link" href="/blog">
                <span class="Link-inner">Blog</span>
              </a>
            </li> -->
          </ul>
        </nav>
      </div>
    </div>
  </header>

  <main class="Site-main" id="container" role="main">

    <section class="Section u-fulfix">
      <div class="Site-container Site-container--narrow">
        <div class="Type">
          <h1 class="Type-large u-textBold">404 - Looks like this page doesn’t exist.</h1>
          <p class="Type-large">I have just recently updated my website so maybe you can find your link working on my old website: <a href="http://vincentorback.se<?php echo $asd; ?>">v4.vincentorback.se<?php echo $asd; ?></a></p>
        </div>
      </div>
    </section>

  </main>

  <footer class="Foot Section" role="contentinfo" id="contact">
    <div class="Site-container">
      <div class="Foot-inner">
        <div class="Foot-section">
          <p class="Foot-title">Contact</p>
          <p><span class="Link u-selectAll js-contact">
            <span class="Link-inner">hello@vincentorback.se</span>
          </span></p>
          <br>
          <p class="Foot-title">Location</p>
          <p class="u-textTruncate">Stockholm, Sweden</p>
        </div>
        <div class="Foot-section">
          <p class="Foot-title">Social</p>
          <ul>
            <li><a class="Foot-link Link" href="https://github.com/vincentorback" rel="me">
              <span class="Link-inner">GitHub</span>
            </a></li>
            <li><a class="Foot-link Link" href="https://codepen.io/vincentorback/" rel="me">
              <span class="Link-inner">CodePen</span>
            </a></li>
            <li><a class="Foot-link Link" href="https://twitter.com/vorback" rel="me">
              <span class="Link-inner">Twitter</span>
            </a></li>
            <li><a class="Foot-link Link" href="https://se.linkedin.com/in/vincent-orback-45795750" rel="me">
              <span class="Link-inner">LinkedIn</span>
            </a></li>
          </ul>
        </div>
        <div class="Foot-section">
          <div class="Foot-slap">
            <figure class="Foot-slapHand js-slap"></figure>
            <p class="Foot-slapText js-slapText"></p>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <script src="/assets/javascript/main.js" async></script>
  <script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "http://vincentorback.se",
        "name": "Vincent Orback",
        "url": "http://vincentorback.se",
        "email": "hello@vincentorback.se",
        "logo": "http://vincentorback.se/assets/images/portrait.jpg",
        "sameAs": [
          "https://github.com/vincentorback",
          "http://codepen.io/vincentorback",
          "https://twitter.com/vorback",
          "https://se.linkedin.com/in/vincent-orback-45795750"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Tantogatan 63",
          "addressLocality": "Stockholm",
          "postalCode": "11842",
          "addressCountry": "SE"
        },
        "contactPoint" : [{
          "@type": "ContactPoint",
          "telephone": "+4672-530-9222",
          "contactType": "sales",
          "availableLanguage": [ "English", "Swedish"]
        }],
        "employee": {
          "@type": "Person",
          "name": "Vincent Orback",
          "email": "hello@vincentorback.se",
          "jobTitle": "Web designer",
          "image": "http://vincentorback.se/assets/images/portrait.jpg"
        }
      },
      {
        "@type": "WebSite",
        "name": "Vincent Orback",
        "url": "http://vincentorback.se"
      }
    ]
  }
  </script>

</body>
</html>
