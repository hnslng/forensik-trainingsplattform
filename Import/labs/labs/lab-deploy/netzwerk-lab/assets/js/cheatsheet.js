var Cheatsheet = (function () {
  var sections = [
    {
      title: "Identifikation",
      cmds: [
        {
          cmd: "lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL",
          desc: "Blockger&auml;te auflisten",
        },
        {
          cmd: "fdisk -l /dev/sda",
          desc: "Partitionen und Sektorgr&ouml;&szlig;en",
        },
        { cmd: "parted /dev/sda print", desc: "Partitionstabelle strukturiert" },
      ],
    },
    {
      title: "Imaging",
      cmds: [
        {
          cmd: "dd if=/dev/sda of=disk.img bs=16M conv=noerror,sync status=progress",
          desc: "Standard dd Image",
        },
        {
          cmd: "dc3dd if=/dev/sda of=disk.img hash=sha256 log=imaging.log",
          desc: "dc3dd mit integriertem Hash",
        },
        {
          cmd: "dcfldd if=/dev/sda of=disk.img hash=sha256 hashlog=hash.sha256 bs=16M",
          desc: "dcfldd mit Hash-Log",
        },
        {
          cmd: 'ewfacquire /dev/sda -c case01 -e "Examiner" -d sha256 -t disk01',
          desc: "E01-Format erstellen",
        },
        {
          cmd: "dd if=/dev/sda bs=16M conv=noerror,sync | pv | gzip > disk.img.gz",
          desc: "Komprimiertes Image (Pipeline)",
        },
      ],
    },
    {
      title: "Hashing",
      cmds: [
        {
          cmd: "sha256sum /dev/sda > original.sha256",
          desc: "SHA-256 Hash des Originals",
        },
        {
          cmd: "sha256sum disk.img > image.sha256",
          desc: "SHA-256 Hash des Images",
        },
        {
          cmd: "sha256sum -c image.sha256",
          desc: "Hash-Verifikation (-c = Check)",
        },
        {
          cmd: "sha256sum /dev/sda disk.img",
          desc: "Direkter Vergleich beider Hashes",
        },
        {
          cmd: "md5sum /dev/sda > original.md5",
          desc: "MD5 Hash (optional, zus&auml;tzlich)",
        },
      ],
    },
    {
      title: "Mount / Unmount",
      cmds: [
        { cmd: "mount -o ro /dev/sdb1 /mnt/usb", desc: "Read-only mounten" },
        {
          cmd: "mount -o ro,loop,offset=1048576 disk.img /mnt/image",
          desc: "Image-Partition per Loop mounten",
        },
        {
          cmd: "ewfmount disk.E01 /mnt/ewf && mount -o ro,loop /mnt/ewf/ewf1 /mnt/image",
          desc: "E01-Image mounten",
        },
        { cmd: "umount /mnt/usb", desc: "Unmounten" },
        { cmd: "losetup -a", desc: "Loop-Devices pr&uuml;fen" },
        { cmd: "losetup -d /dev/loopX", desc: "Loop-Device entfernen" },
      ],
    },
    {
      title: "Analyse",
      cmds: [
        { cmd: "xxd -l 512 disk.img > mbr.hex", desc: "Erste 512 Bytes (MBR) dumpen" },
        { cmd: "xxd -l 4096 -c 16 disk.img > first4k.hex", desc: "Erste 4 KiB dumpen" },
        {
          cmd: 'strings disk.img | grep -i "password"',
          desc: "Strings extrahieren und filtern",
        },
        {
          cmd: 'dd if=disk.img bs=1M count=10 2>/dev/null | strings | grep -i pdf',
          desc: "Teilbereich scannen",
        },
        { cmd: "fls -r disk.img > filelist.txt", desc: "Dateiliste mit Sleuth Kit" },
        { cmd: "mmls disk.img", desc: "Partitionen im Image anzeigen" },
      ],
    },
    {
      title: "Vergleich",
      cmds: [
        { cmd: "diff -u file1.txt file2.txt", desc: "Textvergleich (Unified Diff)" },
        { cmd: "cmp -l file1.bin file2.bin", desc: "Bin&auml;rvergleich" },
      ],
    },
    {
      title: "Protokollierung",
      cmds: [
        {
          cmd: 'script -f session_$(date +%Y%m%d_%H%M%S).log',
          desc: "Terminal-Sitzung protokollieren",
        },
        {
          cmd: 'history > history_$(date +%Y%m%d_%H%M%S).txt',
          desc: "Bash-History sichern",
        },
        {
          cmd: 'date > info.txt && uname -a >> info.txt && cat /etc/os-release >> info.txt',
          desc: "Systeminfo dokumentieren",
        },
      ],
    },
    {
      title: "Wipe (DESTRUKTIV)",
      cmds: [
        {
          cmd: "dd if=/dev/zero of=/dev/sda bs=16M conv=sync,noerror",
          desc: "HDD mit Nullen &uuml;berschreiben",
        },
        {
          cmd: "dd if=/dev/zero of=/dev/sda bs=512 count=2048",
          desc: "Nur Header/Anfangsbereich zerst&ouml;ren",
        },
        {
          cmd: "hdparm --user-master u --security-erase SecureErase /dev/sda",
          desc: "SATA-SSD Secure Erase",
        },
        {
          cmd: "nvme format /dev/nvme0n1 --ses=1",
          desc: "NVMe Secure Erase",
        },
      ],
    },
  ];

  function render() {
    var body = document.getElementById("cheatsheet-body");
    if (!body) return;
    var html = "";
    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      html += '<div class="cheatsheet-section">';
      html += "<h3>" + s.title + "</h3>";
      for (var j = 0; j < s.cmds.length; j++) {
        var c = s.cmds[j];
        html +=
          '<div class="cheatsheet-cmd" onclick="Cheatsheet.copyCmd(this)">' +
          escapeHtml(c.cmd) +
          "</div>";
        html += '<div class="cheatsheet-desc">' + c.desc + "</div>";
      }
      html += "</div>";
    }
    body.innerHTML = html;
  }

  function copyCmd(el) {
    var text = el.textContent;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        flashCopy(el);
      });
    } else {
      var ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      flashCopy(el);
    }
  }

  function flashCopy(el) {
    var orig = el.style.borderColor;
    el.style.borderColor = "#22c55e";
    setTimeout(function () {
      el.style.borderColor = "";
    }, 600);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  return {
    render: render,
    copyCmd: copyCmd,
  };
})();
