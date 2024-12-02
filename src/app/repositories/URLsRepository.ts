import URL from "../entities/URL";
import IURLs from "../interfaces/IURLs";
//import { AppDataSource } from "src/database/data-source";
import { AppDataSource } from "../../database/data-source";


const URLsRepository = AppDataSource.getRepository(URL);

const getURLs = (): Promise<IURLs[]> => {
    return URLsRepository.find(); //select * from
}

export default { getURLs };