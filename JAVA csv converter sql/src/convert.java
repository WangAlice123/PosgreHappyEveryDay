
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;

import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;

public class convert {
	public static void main(String[] args) throws FileNotFoundException {

		/**
		 * --------------------------------------- Read CSV rows into
		 * 2-dimensional array ---------------------------------------
		 */

		// 1st, creates a CSV parser with the configs
		CsvParser parser = new CsvParser(new CsvParserSettings());

		// 2nd, parses all rows from the CSV file into a 2-dimensional array
		List<String[]> resolvedData = parser.parseAll(new FileReader("/Users/rayliu/Desktop/movie.csv"));

		
		String eol = System.getProperty("line.separator");
		
		String query = general(resolvedData, "movie");
		String path = "/Users/rayliu/Desktop/movie.sql";
		try {
			Files.write(Paths.get(path), query.getBytes(), StandardOpenOption.CREATE);
		} catch (IOException e) {
			System.out.println("IO ERROR");
		}
	}

	// help method
	public static String actor(List<String[]> a) {
		String eol = System.getProperty("line.separator");
		String query = "";
		for (int i = 1; i < a.size(); i++) {
			query = query + eol + "INSERT INTO movie(actor_id,last_name,first_name,date_of_birth) VALUES(\'"
					+ a.get(i)[0] + "\',\'" + a.get(i)[1] + "\',\'" + a.get(i)[2] + "\',\'Convert(DateTime,\'"
					+ a.get(i)[3] + "\',126)\');";

		}
		return query;
	}

	// help method
	public static String movie(List<String[]> a) {
		String eol = System.getProperty("line.separator");
		String query = "";
		for (int i = 1; i < a.size(); i++) {

			query = query + eol
					+ "INSERT INTO movie(movie_id,name,date_released,language,subtitles,country,trailer,image) VALUES(\'"
					+ a.get(i)[0] + "\',\'" + a.get(i)[1] + "\',\'" + a.get(i)[2] + "\',\'" + a.get(i)[3] + "\',\'"
					+ a.get(i)[4] + "\',\'" + a.get(i)[5] + "\',\'" + a.get(i)[6] + "\',\'" + a.get(i)[7] + "\');";

		}

		return query;
	}

	// get user
	public static String general(List<String[]> a, String table) {
		String title = "INSERT INTO " + table + "(";
		for (int k = 0; k < a.get(0).length; k++) {
			if (k == a.get(0).length - 1) {
				title = title + a.get(0)[k];
			} else {
				title = title + a.get(0)[k] + ",";
			}
		}
		title = title + ") VALUES(\'";
		String eol = System.getProperty("line.separator");
		String query = "";
		for (int i = 1; i < a.size(); i++) {
			query = query + eol + title;
			for (int g = 0; g < a.get(0).length; g++) {
				if(g == a.get(0).length - 1) {
				query = query+ a.get(i)[g] + "\');";}
				else{
					query = query+a.get(i)[g] + "\',\'";
				}

			}
		}

		return query;
	}

}