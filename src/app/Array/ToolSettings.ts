import { SelectorContext } from '@angular/compiler';
import { ToolSettings } from '../interface/ToolSettings';
import { DiscardChanges } from '../Scripts/exit/DiscardChanges';
import { LoadDefaults } from '../Scripts/exit/LoadDefaults';
import { SaveChanges } from '../Scripts/exit/SaveChanges';
import { setTime } from '../Scripts/Time';

export var Main: ToolSettings = {
  title: 'System Overview',
  settings: [
    {
      title: 'System Language',
      options: [
        {
          title: 'English',
        },
        {
          title: 'Korea',
        },
        {
          title: 'Slovakia',
        },
        {
          title: 'Deutschland',
        },
      ],
      time: [],
      date: [],
      optionsFast: null,
      description: 'Choose the default language',
      selected: 0,
    },
    {
      title: 'System Time',
      options: [],
      time: [
        {
          title: '10',
        },
        {
          title: '20',
        },
        {
          title: '30',
        },
      ],
      date: [],
      optionsFast: null,
      description: 'Nastavení',
      selected: 0,
    },
    {
      title: 'System Date',
      options: [],
      time: [],
      date: setTime(),
      optionsFast: null,
      description: 'Nastavení',
      selected: 0,
    },
  ],
};

export var Boot: ToolSettings = {
  title: '',
  settings: [
    {
      title: 'Boot Mode',
      options: [
        {
          title: 'UEFI',
        },
        {
          title: 'Legacy',
        },
      ],
      time: [],
      date: [],
      optionsFast: null,
      description: 'Set System Boot Mode',

      selected: 0,
    },
    {
      title: 'Secure Boot',
      options: [
        {
          title: 'Enabled',
        },
        {
          title: 'Disabled',
        },
      ],
      time: [],
      date: [],
      optionsFast: null,
      description: 'Nastavení',
      selected: 0,
    },
    {
      title: 'Boot priority order',
      options: [
        {
          title: '1. Samsung 860 EVO M.2 1TB',
        },
        {
          title: '2. IBM 1405 0.0075 GB',
        },
        {
          title: '3. Seagate ST-225 0.021 GB',
        },
      ],
      time: [],
      date: [],
      optionsFast: null,
      description: 'Nastavení',
      selected: 0,
    },
  ],
};

export var Exit: ToolSettings = {
  title: '',
  settings: [
    {
      title: 'Load Optimized Defaults',
      options: [],
      time: [],
      date: [],
      optionsFast: () => LoadDefaults(),
      description: 'Restores/loads the default values for all the setup options',

      selected: 0,
    },
    {
      title: 'Save Changes & Reset',
      options: [],
      time: [],
      date: [],
      optionsFast: () => SaveChanges(),
      description: 'Set System Boot Mode',
      selected: 0,
    },
    {
      title: 'Discard Changes & Exit',
      options: [],
      time: [],
      date: [],
      optionsFast: () => DiscardChanges(),
      description: 'Set System Boot Mode',
      selected: 0,
    },
  ],
};
