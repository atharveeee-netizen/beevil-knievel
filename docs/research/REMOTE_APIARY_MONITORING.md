# 📡 Remote Apiary Telemetry & Sub-GHz LoRa Mesh Architecture

## 1. The Rural Telecommunications Dilemma
Commercial beekeeping out-yards are intentionally situated in remote agricultural frontiers, state forest concessions, and river valleys with rich floral diversity. These locations suffer from two prohibitive telecommunications barriers:
1. **Pervasive Cellular Dead Zones**: 2G/3G sunsetting and poor 4G LTE-M / NB-IoT rural coverage leave beekeepers without dependable cloud uplinks.
2. **Prohibitive Recurring Operating Expenses**: Outfitting 100 beehives with individual cellular SIM cards incurring monthly subscription fees ($3 to $10/node/month) generates **$3,600 to $12,000 USD/year** in recurring overhead, making commercial adoption economically unviable.

---

## 2. The Sub-GHz LoRa Alternative
BEEVIL KNIEVEL resolves this economic and coverage challenge by employing **Sub-GHz LoRa (Long Range)** modulation on license-free ISM spectrum (IN865 / 865.0625 MHz):
- **High Receiver Sensitivity ($-124.53\text{ dBm}$)**: Operates below the ambient thermal noise floor using Chirp Spread Spectrum (CSS) modulation at Spreading Factor 7 (SF7).
- **Superior Foliage Penetration**: Sub-GHz radio waves exhibit an attenuation coefficient of only $\approx 0.191\text{ dB/m}$ through dense orchard canopy, whereas $2.4\text{ GHz}$ signals suffer severe dielectric absorption from water contained in leaves.
- **Zero Ongoing Operational Cost**: Operating on license-free spectrum requires zero monthly SIM card fees or third-party cloud subscriptions.

---

## 3. Dynamic Multi-Hop Mesh Topology (`BeevilMesh`)
In complex topography (e.g., hives located behind hillocks, farm sheds, or deep ravines), a simple star topology direct to the gateway fails. BEEVIL KNIEVEL implements **BeevilMesh**:
- **Dynamic Time-to-Live (TTL)**: Outlying nodes broadcast telemetry packets with a decrementing TTL (default $TTL = 3$). Intermediary hives acting as repeaters forward packets if the TTL is valid.
- **Circular CRC16 Ring Deduplication**: Each node maintains an in-memory 16-packet circular buffer storing recent payload CRC16 hashes, immediately dropping redundant transmissions to prevent broadcast storms.
- **Micro-Duty Cycling**: With an airtime of only **$71.94\text{ ms}$** per packet, channel occupancy remains well below the statutory $0.1\%$ WPC limit, enabling up to 100 nodes to co-exist cleanly on a single frequency.

---

## 4. Hardened Edge Gateway (Raspberry Pi 3B+)
The apiary gateway sits atop a central mast or honey storage shed, powered via PoE or solar backup:
- **OverlayFS Power-Loss Immunity**: Employs a permanent read-only root filesystem with ephemeral tmpfs overlays, completely eliminating SD-card/eMMC corruption during sudden farm power cuts.
- **SQLite WAL High-Throughput Ingestion**: Written in asynchronous Python (FastAPI + uvicorn), capable of ingesting over **$148\text{ packets/second}$** with sub-7ms query latency.
- **Local Conversational Intelligence**: Houses local heuristic diagnostic classifiers and offline quantized small language models (SLM) accessible via local Wi-Fi captive portal (`http://beevil.local`), providing beekeepers with diagnostic insights directly in the bee yard.
