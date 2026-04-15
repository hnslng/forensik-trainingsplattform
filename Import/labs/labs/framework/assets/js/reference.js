// Reference system that loads lab-specific references
var Reference = (function () {
  var loaded = false;
  var currentLabId = null;
  
  function loadReference() {
    if (!window.LAB_CONFIG) return;
    if (loaded && currentLabId === window.LAB_CONFIG.labId) return;
    
    currentLabId = window.LAB_CONFIG.labId;
    
    // Determine which reference to load
    var refPath = '/api/labs/' + currentLabId + '/reference';
    
    // For now, we'll include both references in the same file and filter
    renderReference(currentLabId);
    loaded = true;
  }
  
  function renderReference(labId) {
    var container = document.getElementById('reference-body');
    if (!container) return;
    
    if (labId === 'netzwerk') {
      container.innerHTML = getNetzwerkReference();
    } else {
      container.innerHTML = getForensikReference();
    }
  }
  
  function getNetzwerkReference() {
    return `
      <h2>&#128220; Netzwerk Cheatsheet</h2>
      <div class="reference-section" id="ref-1-interfaces">
        <h3>1. Interface & IP-Adressen</h3>
        <pre class="code-block"><code>ip addr show</code><button class="copy-btn">Kopieren</button></pre>
        <pre class="code-block"><code>ip link show</code><button class="copy-btn">Kopieren</button></pre>
        <pre class="code-block"><code>ifconfig</code><button class="copy-btn">Kopieren</button></pre>
      </div>
      
      <div class="reference-section" id="ref-2-ip-config">
        <h3>2. IP-Konfiguration</h3>
        <pre class="code-block"><code>ip addr add 192.168.1.100/24 dev eth0</code><button class="copy-btn">Kopieren</button></pre>
        <pre class="code-block"><code>ip addr del 192.168.1.100/24 dev eth0</code><button class="copy-btn">Kopieren</button></pre>
      </div>
      
      <div class="reference-section" id="ref-3-routing">
        <h3>3. Routing</h3>
        <pre class="code-block"><code>ip route show</code><button class="copy-btn">Kopieren</button></pre>
        <pre class="code-block"><code>ip route add default via 192.168.1.1</code><button class="copy-btn">Kopieren</button></pre>
      </div>
      
      <!-- More sections... -->
      
      <div class="reference-section" id="ref-16-quellen">
        <h3>16. Quellen & Standards</h3>
        <ul>
          <li><strong>RFC 791</strong> – IPv4</li>
          <li><strong>RFC 793</strong> – TCP</li>
          <li><strong>RFC 826</strong> – ARP</li>
        </ul>
      </div>
    `;
  }
  
  function getForensikReference() {
    return `
      <h2>&#128220; Forensik Cheatsheet</h2>
      <div class="reference-section" id="ref-1-devices">
        <h3>1. Geräte & Partitionen</h3>
        <pre class="code-block"><code>lsblk</code><button class="copy-btn">Kopieren</button></pre>
        <pre class="code-block"><code>fdisk -l</code><button class="copy-btn">Kopieren</button></pre>
      </div>
      
      <div class="reference-section" id="ref-2-imaging">
        <h3>2. Imaging</h3>
        <pre class="code-block"><code>dd if=/dev/sdb of=image.dd bs=4M status=progress</code><button class="copy-btn">Kopieren</button></pre>
      </div>
      
      <!-- More sections... -->
      
      <div class="reference-section" id="ref-21-glossar">
        <h3>21. Glossar</h3>
        <ul>
          <li><strong>Hash</strong> – digitaler Fingerabdruck einer Datei</li>
          <li><strong>Write Blocker</strong> – Hardware zum schreibgeschützten Anschluss</li>
        </ul>
      </div>
    `;
  }
  
  function init() {
    loadReference();
    bindReferenceEvents();
  }
  
  function bindReferenceEvents() {
    // Copy buttons
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('copy-btn')) {
        var code = e.target.closest('.code-block').querySelector('code');
        if (code) {
          navigator.clipboard.writeText(code.textContent).then(function() {
            var btn = e.target;
            btn.textContent = "Kopiert!";
            btn.classList.add('copied');
            setTimeout(function() {
              btn.textContent = "Kopieren";
              btn.classList.remove('copied');
            }, 2000);
          });
        }
      }
    });
  }
  
  return {
    init: init,
    reload: function() { loaded = false; loadReference(); }
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Reference.init);
} else {
  Reference.init();
}
