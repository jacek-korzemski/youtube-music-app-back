import mrdoom666 from "assets/channels_icons/mrdoom666.jpg";
import nwothm from "assets/channels_icons/nwothm.jpg";
import atmoblackmetal from "assets/channels_icons/atmoblackmetal.jpg";
import gregbiehl from "assets/channels_icons/gregbiehl.jpg";
import melomano from "assets/channels_icons/melomano.jpg";
import smod from "assets/channels_icons/smod.jpg";
import dotdotdot from "assets/channels_icons/dotdotdot.jpg";
import mpampisflou from "assets/channels_icons/mpampisflou.jpg";
import heavyrockfreak from "assets/channels_icons/heavyrockfreak.jpg";
import rhammer from "assets/channels_icons/rhammer.jpg";
import bmp from "assets/channels_icons/bmp.jpg";

export const channelImage = (id: number) => {
  switch (id) {
    case 16:
      return mrdoom666;

    case 17:
      return nwothm;

    case 46:
      return atmoblackmetal;

    case 47:
      return gregbiehl;

    case 48:
      return melomano;

    case 49:
      return smod;

    case 50:
      return dotdotdot;

    case 51:
      return mpampisflou;

    case 53:
      return heavyrockfreak;

    case 54:
      return rhammer;

    case 56:
      return bmp;

    default:
      return undefined;
  }
};
