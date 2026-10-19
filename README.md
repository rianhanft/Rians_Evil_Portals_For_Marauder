
<img width="2800" height="1000" alt="logo" src="https://github.com/user-attachments/assets/e7cbf1d6-b54f-428f-978c-c3ac70bed232" />

______________________________________________________________________________________________________________________________________
🛜 **A curated and maintained collection of 400+ ready-to-use captive portals built for the Marauder firmware — and compatible with any firmware that uses HTML-based portal structures.**

This repo features new types of captive portals where the UI doesn't appear old and/or outdated, while also adding more advanced menu navigation/multiple ways a "victim" can login. (NOTE: not all portals are made with full menu navigation, and the ones available are located in the folders labeled as "Advanced").

## Verified Format For Captive Portals

| Requirement              | Status  |
|--------------------------|---------|
| `action="/get"`          | ✅ All  |
| `name="email"`           | ✅ All  |
| `name="password"`        | ✅ All  |
| No `method=` attribute   | ✅ All  |
| No external dependencies | ✅ All  |
| JavaScript-free forms    | ✅ All  |

## Verified Format For Most Advanced Captive Portals

| Requirement                          | Status |
|--------------------------------------|--------|
| `action="/get"`                      | ✅     |
| `name="email"`                       | ✅     |
| `name="password"`                    | ✅     |
| No `method=` attribute               | ✅     |
| No external dependencies             | ✅     |
| JavaScript-free forms                | ✅     |
| Show/hide password (JS span toggle)  | ✅     |
| 6 overlay types (Forgot/Google/Apple/Guest/Terms/Onboarding) | ✅ |
| `recovery-attempt` hidden field      | ✅     |
| Floating label inputs                | ✅     |
| Pure CSS state machine (no JS tabs)  | ✅     |
| Mobile viewport (`maximum-scale=1`)  | ✅     |
| Marauder DOM (fixed inputs as direct `<body>` children) | ✅ |
| Around 20 KB size limit              | ✅    |
______________________________________________________________________________________________________________________________________________________________________________________________________
⚠️ **Responsible Use:**

These files are provided strictly for authorized penetration testing, professional red team engagements, security research, and educational demonstrations. By downloading or using any file in this repository, you agree that you are solely responsible for ensuring your use complies with all applicable local, state, federal, and international laws — including but not limited to the Computer Fraud and Abuse Act (CFAA), the Electronic Communications Privacy Act (ECPA), and equivalent statutes in your jurisdiction.

Unauthorized use of these tools against networks, systems, or individuals without explicit written permission is illegal and unethical. The repository maintainer(s) assume no liability and expressly disclaim all responsibility for any misuse, damage, legal consequences, or harm arising from the use or distribution of these files. This includes but is not limited to unauthorized credential harvesting, network interference, or any activity conducted without the explicit consent of the network owner.

Use of this repository constitutes your acknowledgment that you have obtained all necessary authorizations prior to deployment, and that any testing is conducted in a controlled environment or under a formal engagement agreement.
______________________________________________________________________________________________________________________________________________________________________________________________________
📦 **Installation:**

  Download the captive portal .html file(s) you want to use.

  Paste the HTML file(s) to the root directory of your Marauder's (or similar firmware's) storage/SD card.

  Launch the device and select the .html captive portal file you want to use.
______________________________________________________________________________________________________________________________________________________________________________________________________
🚨 **Important:** 

  **The HTML files must be located in the root directory of the Marauder's storage. If they are placed inside another folder, the portals will not show up on your device's menu screen.**
______________________________________________________________________________________________________________________________________________________________________________________________________
🌐 **Captive Portals:**

  **MAKE SURE TO CHECK THE UPDATE LOG CONSISTENTLY FOR ANY NEW  CAPTIVE PORTAL RELEASES.**
  
  NOTE: This repository contains 400+ captive portals designed specifically for and around the Marauder firmware. (Portals should work with any similar type of firmware      that can read/launch captive .html files that are around 20 KB, though this hasn't been documented.)

  All portals are provided as .html files.

  If you have an idea for a captive portal you'd like to see added, feel free to reach out.
______________________________________________________________________________________________________________________________________________________________________________________________________
💬 **Contact:**

  Discord: hitgrandmanotjuul

  If you encounter a problem with a captive portal or have questions/concerns about one of the files, let me know, and I'll do my best to get it resolved.
______________________________________________________________________________________________________________________________________________________________________________________________________
❗️**EXAMPLES**❗️


<img width="1179" height="2152" alt="668229069-4bcce3d3-39b4-45ce-a2b7-2e5b1d74faef" src="https://github.com/user-attachments/assets/00fd0fe6-f734-433c-a4cb-307f24bccd29" 
/>---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


<img width="1179" height="2152" alt="668229266-c418a30f-5eb0-4b46-8b3f-bc5f934a1808" src="https://github.com/user-attachments/assets/efd1ceda-75d2-44b6-af5d-1d2bac2197fc" />---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


<img width="1179" height="2168" alt="668229203-a5192763-f74a-436b-8e65-974afc86cda6" src="https://github.com/user-attachments/assets/b7a62e2f-29d8-4cf0-b636-505bb9de76d3" />---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

