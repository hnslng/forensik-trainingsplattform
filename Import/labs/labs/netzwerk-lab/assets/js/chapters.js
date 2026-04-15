var Chapters = {};

Chapters.welcome = function () {
  return '<div class="welcome-hero">' +
    '<p class="welcome-hero-eyebrow">NETZWERKTECHNIK TRAINING</p>' +
    '<h1>Netzwerkgrundlagen & Praxis</h1>' +
    '<p class="welcome-hero-desc">Von OSI-Modell bis Troubleshooting — interaktives Training mit simuliertem Terminal, Übungen und Schritt-für-Schritt-Erklärungen.</p>' +
    '<button class="welcome-cta" onclick="App.navigateTo(\'ch01-osi\')">Training starten &rarr;</button>' +
    '</div>' +

    '<div class="welcome-note">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' +
    '<span>Alle Übungen werden im simulierten Terminal durchgeführt — keine echten Netzwerkverbindungen.</span>' +
    '</div>' +

    '<div class="welcome-modules">' +

    '<div class="welcome-module" onclick="App.navigateTo(\'ch01-osi\')">' +
    '<div class="welcome-module-left"><span class="welcome-module-num">01</span></div>' +
    '<div class="welcome-module-body">' +
    '<h2>Grundlagen & Modelle</h2>' +
    '<p>OSI-Modell, TCP/IP-Stack, Netzwerkgeräte, IPv4/IPv6 Adressierung, MAC-Adressen, ARP</p>' +
    '</div>' +
    '<span class="welcome-module-arrow">&rarr;</span>' +
    '</div>' +

    '<div class="welcome-module" onclick="App.navigateTo(\'ch06-tcp-udp\')">' +
    '<div class="welcome-module-left"><span class="welcome-module-num">02</span></div>' +
    '<div class="welcome-module-body">' +
    '<h2>Protokolle & Dienste</h2>' +
    '<p>TCP/UDP, DNS, DHCP, HTTP/HTTPS, Verschlüsselung, ICMP & Troubleshooting</p>' +
    '</div>' +
    '<span class="welcome-module-arrow">&rarr;</span>' +
    '</div>' +

    '<div class="welcome-module" onclick="App.navigateTo(\'ch12-linux-tools\')">' +
    '<div class="welcome-module-left"><span class="welcome-module-num">03</span></div>' +
    '<div class="welcome-module-body">' +
    '<h2>Praxis & Analyse</h2>' +
    '<p>Linux-Netzwerktools, Routing, Firewall, Wireshark, Paketanalyse, Case Study</p>' +
    '</div>' +
    '<span class="welcome-module-arrow">&rarr;</span>' +
    '</div>' +

    '</div>';
};

// Leere Funktionen für alle Kapitel - werden via API geladen
Chapters['ch01-osi'] = function () { return ''; };
Chapters['ch02-geraete'] = function () { return ''; };
Chapters['ch03-ipv4'] = function () { return ''; };
Chapters['ch04-ipv6'] = function () { return ''; };
Chapters['ch05-mac-arp'] = function () { return ''; };
Chapters['ch06-tcp-udp'] = function () { return ''; };
Chapters['ch07-dns'] = function () { return ''; };
Chapters['ch08-dhcp'] = function () { return ''; };
Chapters['ch09-http'] = function () { return ''; };
Chapters['ch10-verschluesselung'] = function () { return ''; };
Chapters['ch11-icmp'] = function () { return ''; };
Chapters['ch12-linux-tools'] = function () { return ''; };
Chapters['ch13-routing'] = function () { return ''; };
Chapters['ch14-firewall'] = function () { return ''; };
Chapters['ch15-wireshark'] = function () { return ''; };
Chapters['ch16-casestudy'] = function () { return ''; };