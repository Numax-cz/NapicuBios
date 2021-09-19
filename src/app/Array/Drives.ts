import { system } from '../interface/System';
import { SystemDrives } from '../interface/SystemDrives';
import { Options } from '../interface/ToolSettings';
//TODO
//? Samsung - Main System
//? IBM - Low graphic interface operating system
//? Segate - No operating system

const NapicuOS: system = {
  boot: {
    title: 'NapicuOS',
    logo: '/assets/icons/icon-128x128.png',
  },
};

/**
 * Main disks
 */
export const drive: SystemDrives[] = [
  {
    title: 'IBM 1405 0.0075 GB',
    data: {},
  },
  {
    title: 'Seagate ST-225 0.021 GB',
    data: {
      boot: {
        system: [NapicuOS],
      },
    },
  },
  {
    title: 'Samsung 860 EVO M.2 1TB',
    data: {
      boot: {},
    },
  },
];
