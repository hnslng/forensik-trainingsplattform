<h2 class="section-title"><span class="number">11.2</span> &Uuml;bung: Identifikation</h2><p>Identifiziere das Ziel-Device eindeutig:</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL && hdparm -I /dev/sdb | grep "Serial Number"</code></pre></div><p><strong>Erwartete Ausgabe im Terminal:</strong></p><div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>NAME        SIZE  TYPE MOUNTPOINT MODEL
sda         500G  disk            Samsung SSD 860
├─sda1      512M  part /boot
├─sda2      499G  part /
sdb          16G  disk            SanDisk USB
└─sdb1       16G  part
nvme0n1     512G  disk            Samsung NVMe 970
└─nvme0n1p1 512G  part

  Serial Number:      4C5300011602181052</code></pre></div>
