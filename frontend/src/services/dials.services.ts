import {fetcher} from "@/lib/fetcher";
import {IDial} from "@/types/dial.interface";

export async function getAllDials() {
    return await fetcher<IDial[]>(`/dials`).then(res => res || []);
}