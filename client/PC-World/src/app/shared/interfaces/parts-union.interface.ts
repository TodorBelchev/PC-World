import { ICase } from "./case.interface";
import { ICooler } from "./cooler.interface";
import { IHdd } from "./hdd.interface";
import { IMemory } from "./memory.interface";
import { IMotherboard } from "./motherboard.interface";
import { IProcessor } from "./processor.interface";
import { IPsu } from "./psu.interface";
import { ISsd } from "./ssd.interface";
import { IVga } from "./vga.interface";

export type IPartsUnion = ICase |
    ICooler |
    IHdd |
    IMemory |
    IMotherboard |
    IProcessor |
    IPsu |
    ISsd |
    IVga;