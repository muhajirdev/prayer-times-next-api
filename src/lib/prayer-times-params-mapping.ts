import { CalculationMethod, CalculationParameters, Madhab } from "adhan";

export const defaultCalculationMethod = CalculationMethod.MuslimWorldLeague()

export const calculationMethodMappings: Record<string, CalculationParameters> = {
    MuslimWorldLeague : CalculationMethod.MuslimWorldLeague(),
    Egyptian : CalculationMethod.Egyptian(),
    Karachi : CalculationMethod.Karachi(),
    UmmAlQura : CalculationMethod.UmmAlQura(),
    Dubai : CalculationMethod.Dubai(),
    Qatar : CalculationMethod.Qatar(),
    Kuwait : CalculationMethod.Kuwait(),
    MoonsightingCommittee : CalculationMethod.MoonsightingCommittee(),
    Singapore : CalculationMethod.Singapore(),
    Turkey : CalculationMethod.Turkey(),
    Tehran : CalculationMethod.Tehran(),
    NorthAmerica : CalculationMethod.NorthAmerica()
}

export const madhabMappings = {
    Shafi: Madhab.Shafi,
    Hanafi: Madhab.Hanafi
}