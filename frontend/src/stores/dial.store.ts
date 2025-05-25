import {create} from 'zustand';
import {IDial} from "@/types/dial.interface";
import {arrayToRecord} from "@/lib/helpers";
import {getAllDials} from "@/services/dials.services";

interface DialState {
    dials: Record<string, IDial>;
    selectedDial: IDial | null;
    setSelectedDial: (dial: string | null) => void;
    updateDial: (dial: IDial) => void;
    addDial: (dial: IDial) => void;
    fetchDials: () => void;
}

export const useDialStore = create<DialState>((set) => ({
        dials: {},
        selectedDial: null,
        fetchDials: async () => {
            const response = await getAllDials();
            set({
                dials: arrayToRecord<IDial, "dial_id">(response, 'dial_id')
            })
        },

        setSelectedDial: (dial: string | null) => set(state => ({
            selectedDial: dial ? state.dials[dial] : null
        })),
        updateDial:
            (dial: IDial) => set(state => ({
                dials:
                    {
                        ...state.dials, [dial.dial_id]: {
                            ...(state.dials[dial.dial_id] || {}), ...dial
                        }
                    },
                selectedDial: state.selectedDial?.dial_id === dial.dial_id ? dial : state.selectedDial
            })),
        addDial: (dial: IDial) => {
            set(state => ({
                dials: {
                    [dial.dial_id]: dial, ...state.dials,
                }
            }))
        },
    })
)