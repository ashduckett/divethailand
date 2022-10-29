<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once "DBObject.php";
    require_once 'config.php';

    class DiveSite extends DataObject implements JSONSerializable {
        protected $data = array(
            "id" => "",
            "heading" => "",
            "subheading" => "", 
            "thumbnailPath" => "",
            "diverLevel" => "",
            "rating" => "",
            "ratingComment" => "",
            "depth" => "",
            "visibility" => "",
            "current" => "",
            "locationText" => "",
            "locationTextTitle" => "",
            "locationImagePaths" => "",
            "islands" => "",
            "virtualTourUrl" => "",
            "isDiveSite" => "",
            "presentationOrder" => "",
            "regions" => "",
            "isPaid" => "",
            "type" => "",
            "isDraft" => "",
            "associatedPlaceID" => "",
            "isArchived" => "",
            "isSponsored" => ""
        );


    public static function incrementAllPresentationOrders() {
        $allDiveSites = DiveSite::getAll();

        foreach ($allDiveSites as $diveSite) {
            $diveSite->setValue('presentationOrder', $diveSite->getValue('presentationOrder') + 1);
            $diveSite->update();
        }
    }
    
    // Function to delete any unused images from the server
    public static function removeUnusedImages() {
        // Get all the dive sites.
        $allDiveSites = DiveSite::getAll();

        // Extract all of the image paths
        $thumbnailPaths = [];
        $locationImagePaths = [];
        

        // $array = json_decode($allDiveSites[0]->getValue('locationImagePaths'));
        

        foreach($allDiveSites as $diveSite) {
            $thumbnailPaths[] = $diveSite->getValue('thumbnailPath');
            
            if ($diveSite->getValue('locationImagePaths') !== null) {
                // Current array of images: json_decode($diveSite->getValue('locationImagePaths')
                $array = json_decode($diveSite->getValue('locationImagePaths'));

                foreach($array as $item) {
                    $locationImagePaths[] = $item;    
                }
            }
        }

        // Grab all the files in the thumbnails directory
        $path = __DIR__ . '/../img/divesites/thumbnails';
        $thumbnailFiles = scandir($path);
        

        foreach($thumbnailFiles as $thumbnailFile) {
            if ($thumbnailFile !== '.' && $thumbnailFile != '..') {
                if (!in_array($thumbnailFile, $thumbnailPaths)) {
                    // Delete thumbnailFile
                    unlink(__DIR__ . '/../img/divesites/thumbnails/' . $thumbnailFile);
                }
            }
        }

        // Grab all the files in the location_images directory
        $locationImages = scandir(__DIR__ . '/../img/divesites/location_images');

        foreach($locationImages as $locationImage) {
            if ($locationImage !== '.' && $locationImage !== '..') {
                if (!in_array($locationImage, $locationImagePaths)) {
                    // Delete thumbnailFile
                    unlink(__DIR__ . '/../img/divesites/location_images/' . $locationImage);
                }
            }
        }
    }

        // This will need to be updated for a full insert.
         public function insert() {
            $conn = DataObject::connect();
            $sql = "INSERT INTO " . TBL_DIVE_SITE . "(heading, subheading, thumbnailPath, diverLevel, rating, ratingComment, depth, visibility, 
                                                        current, locationText, locationTextTitle, locationImagePaths, islands, virtualTourUrl,
                                                        isDiveSite, presentationOrder, regions, isPaid, type, isDraft, associatedPlaceID, isArchived, isSponsored) VALUES (:heading, :subheading, :thumbnailPath, :diverLevel, 
                                                        :rating, :ratingComment, :depth, :visibility, :current, :locationText, :locationTextTitle, 
                                                        :locationImagePaths, :islands, :virtualTourUrl, :isDiveSite, :presentationOrder, :regions, :isPaid, :type, :isDraft, :associatedPlaceID, :isArchived, :isSponsored)";
            
            
            // If these two factors are true, we have a pure draft. So set all the other presentation orders to one more,
            // and this one should have a presentation order of zero.
            if ($this->getValue('isDraft') == 1 && $this->getValue('associatedPlaceID') == null) {
                DiveSite::incrementAllPresentationOrders();
                $this->setValue('presentationOrder', 0);
            }
            
            try {
                $st = $conn->prepare($sql);
                $st->bindValue(":heading", $this->data["heading"], PDO::PARAM_STR);
                $st->bindValue(":subheading", $this->data["subheading"], PDO::PARAM_STR);
                $st->bindValue(":thumbnailPath", $this->data["thumbnailPath"], PDO::PARAM_STR);
                $st->bindValue(":diverLevel", $this->data["diverLevel"], PDO::PARAM_INT);
                $st->bindValue(":rating", $this->data["rating"], PDO::PARAM_STR);
                $st->bindValue(":ratingComment", $this->data["ratingComment"], PDO::PARAM_STR);
                $st->bindValue(":depth", $this->data["depth"], PDO::PARAM_STR);
                $st->bindValue(":visibility", $this->data["visibility"], PDO::PARAM_STR);
                $st->bindValue(":current", $this->data["current"], PDO::PARAM_STR);
                $st->bindValue(":locationText", $this->data["locationText"], PDO::PARAM_STR);
                $st->bindValue(":locationTextTitle", $this->data["locationTextTitle"], PDO::PARAM_STR);
                $st->bindValue(":locationImagePaths", $this->data["locationImagePaths"], PDO::PARAM_STR);
                $st->bindValue(":islands", $this->data["islands"], PDO::PARAM_STR);
                $st->bindValue(":virtualTourUrl", $this->data["virtualTourUrl"], PDO::PARAM_STR);
                $st->bindValue(":isDiveSite", $this->data["isDiveSite"], PDO::PARAM_INT);
                $st->bindValue(":presentationOrder", $this->data["presentationOrder"], PDO::PARAM_INT);
                $st->bindValue(":regions", $this->data["regions"], PDO::PARAM_STR);
                $st->bindValue(":isPaid", $this->data["isPaid"], PDO::PARAM_STR);
                $st->bindValue(":type", $this->data["type"], PDO::PARAM_STR);
                $st->bindValue(":isDraft", $this->data["isDraft"], PDO::PARAM_INT);
                $st->bindValue(":associatedPlaceID", $this->data["associatedPlaceID"], PDO::PARAM_INT);
                $st->bindValue(":isArchived", $this->data["isArchived"], PDO::PARAM_INT);
                $st->bindValue(":isSponsored", $this->data["isSponsored"], PDO::PARAM_INT);

                $st->execute();
                $lastInsertId = $conn->lastInsertId();
                DataObject::disconnect($conn);
            } catch(PDOException $e) {
                die("Query failed: " . $e->getMessage());
            }

            
            
            return intval($lastInsertId);
        }

        public function update() {
            // This should just update a plain old divesite.
            // At this point we have the data from the form plonked into the DiveSite.
            // We also have the old data.

            // Grab the current value as an array
            $originalLocationsArray = json_encode($this->data['locationImagePaths']);

            $conn = DataObject::connect();

            $sql = 'UPDATE ' . TBL_DIVE_SITE . ' 
                SET heading = :heading, 
                    subheading = :subheading,  
                    thumbnailPath = :thumbnailPath,
                    diverLevel = :diverLevel, 
                    rating = :rating, 
                    ratingComment = :ratingComment, 
                    depth = :depth, 
                    visibility = :visibility, 
                    current = :current, 
                    locationText = :locationText, 
                    locationTextTitle = :locationTextTitle,
                    locationImagePaths = :locationImagePaths, 
                    islands = :islands, 
                    virtualTourUrl = :virtualTourUrl,
                    isDiveSite = :isDiveSite, 
                    presentationOrder = :presentationOrder,
                    regions = :regions, 
                    isPaid = :isPaid, 
                    type = :type,
                    isDraft = :isDraft,
                    associatedPlaceID = :associatedPlaceID,
                    isArchived = :isArchived,
                    isSponsored = :isSponsored
                WHERE id = :id;';

            try {
                $st = $conn->prepare($sql);
                $st->bindValue(":id", $this->data['id']);
                $st->bindValue(":heading", $this->data['heading']);
                $st->bindValue(":subheading", $this->data['subheading']);
                $st->bindValue(":thumbnailPath", $this->data['thumbnailPath']);
                $st->bindValue(":diverLevel", $this->data['diverLevel']);
                $st->bindValue(":rating", $this->data['rating']);
                $st->bindValue(":ratingComment", $this->data['ratingComment']);
                $st->bindValue(":depth", $this->data['depth']);
                $st->bindValue(":visibility", $this->data['visibility']);
                $st->bindValue(":current", $this->data['current']);
                $st->bindValue(":locationText", $this->data['locationText']);
                $st->bindValue(":locationTextTitle", $this->data['locationTextTitle']);
                $st->bindValue(":locationImagePaths", $this->data['locationImagePaths']);
                $st->bindValue(":islands", $this->data['islands']);
                $st->bindValue(":virtualTourUrl", $this->data['virtualTourUrl']);
                $st->bindValue(":isDiveSite", $this->data['isDiveSite']);
                $st->bindValue(":presentationOrder", $this->data['presentationOrder']);
                $st->bindValue(":regions", $this->data['regions']);
                $st->bindValue(":isPaid", $this->data['isPaid']);
                $st->bindValue(":type", $this->data['type']);
                $st->bindValue(":isDraft", $this->data['isDraft']);
                $st->bindValue(":associatedPlaceID", $this->data['associatedPlaceID']);
                $st->bindValue(":isArchived", $this->data['isArchived']);
                $st->bindValue(":isSponsored", $this->data['isSponsored']);
                $st->execute();
                return true;
            } catch(PDOException $e) {
                die("Query failed: " . $e->getMessage());
            }
        }

        public static function getAll() {
            $conn = parent::connect();

            $sql = 'SELECT * FROM ' . TBL_DIVE_SITE .  ' ORDER BY presentationOrder';

            try {
                $st = $conn->prepare($sql);
                $st->execute();

                $diveSites = array();

                foreach($st->fetchAll() as $row) {
                    $diveSites[] = new DiveSite($row);
                }
           
                parent::disconnect($conn);
                return $diveSites;
            } catch(PDOException $e) {
                die("Query failed: " . $e->getMessage());
            }
        }

        public static function getFiltered($searchTerm, $islands, $diveSite, $lowerDepth, $upperDepth, $current, $level, $region, $isPaid, $type) {
  
            $conn = parent::connect();

            $sql = "SELECT * FROM " . TBL_DIVE_SITE . ' WHERE id IS NOT NULL ';

            if ($searchTerm != null) {
                $sql .= 'AND (LOWER(heading) LIKE LOWER(:searchTerm) || LOWER(subheading) LIKE LOWER(:searchTerm) || LOWER(locationText) LIKE LOWER(:searchTerm) || LOWER(locationTextTitle) LIKE LOWER(:searchTerm))';
            }

            if ($islands !== null) {
                $sql .= ' AND LOWER(islands) LIKE LOWER(:islands)';
            }

            if ($diveSite !== null) {
                $sql .= ' AND isDiveSite = :diveSite';
            }

            if($lowerDepth !== null && $upperDepth !== null) {
                $sql .= ' AND depth >= :lowerDepth AND depth <= :upperDepth';
            }

            if ($current !== null) {
                $sql .= ' AND current = :current';
            }
            
            if ($level !== null) {
                $sql .= ' AND diverLevel = :level';
            }

            if ($region !== null) {
                $sql .= ' AND LOWER(regions) LIKE LOWER(:region)';
            }

            if ($type !== null) {
                $sql .= ' AND LOWER(type) LIKE LOWER(:type)';
            }

            if ($isPaid !== null) {
                $sql .= ' AND isPaid = :isPaid';
            }

            $sql .= ' AND isDraft = 0';

            $sql .= ' AND isArchived = 0';

            $sql .= ' ORDER BY presentationOrder';
            try {
                $st = $conn->prepare($sql);
                $searchTerm = '%' . $searchTerm . '%';
                
                if ($region !== null) {
                    $region = '%' . $region . '%';
                }

                if ($type !== null) {
                    $type = '%' . $type . '%';
                }

                if ($islands !== null) {
                    $islands = '%' . $islands . '%';
                }

                if(strlen($searchTerm) > 2) {
                    $st->bindValue(":searchTerm", $searchTerm, PDO::PARAM_STR);
                }
                
                if($islands !== null) {
                    $st->bindValue(":islands", $islands, PDO::PARAM_STR);
                }


                if($diveSite !== null) {
                    $st->bindValue(":diveSite", $diveSite, PDO::PARAM_STR);
                }

                if($current !== null) {
                    $st->bindValue(":current", $current, PDO::PARAM_INT);
                }

                if($level !== null) {
                    $st->bindValue(":level", $level, PDO::PARAM_INT);
                 }

                 if($isPaid !== null) {
                    $st->bindValue(":isPaid", $isPaid, PDO::PARAM_INT);
                 }


                if($lowerDepth !== null && $upperDepth !== null) {
                    $st->bindValue(":lowerDepth", $lowerDepth, PDO::PARAM_INT);
                    $st->bindValue(":upperDepth", $upperDepth, PDO::PARAM_INT);
                }

                if ($region !== null) {
                    $st->bindValue(":region", $region, PDO::PARAM_STR);
                }

                
                if ($type !== null) {
                    $st->bindValue(":type", $type, PDO::PARAM_STR);
                }



                $st->execute();
            } catch (PDOException $e) {
                die("Query failed: " . $e->getMessage());
            }

            $diveSites = [];

            foreach($st->fetchAll() as $row) {
                $diveSites[] = new DiveSite($row);
            }
          
            return $diveSites;
        }

        public static function getAllAsJSON() {
            $conn = parent::connect();

            $sql = "SELECT * FROM " . TBL_DIVE_SITE;

            try {
                $st = $conn->prepare($sql);
                $st->execute();

                $diveSites = array();

                foreach($st->fetchAll() as $row) {
                    $diveSites[] = new DiveSite($row);
                }
           
                parent::disconnect($conn);
                return json_encode($diveSites);
            } catch(PDOException $e) {
                die("Query failed: " . $e->getMessage());
            }
        }

        public static function findById($diveSiteId) {
            $conn = DataObject::connect();
            $sql = "SELECT * FROM " . TBL_DIVE_SITE . " WHERE id = :diveSiteId";
            $st = $conn->prepare($sql);
            $st->bindValue(":diveSiteId", $diveSiteId);
            $st->execute();
            $diveSites = array();
                    
            foreach($st->fetchAll() as $row) {
                $diveSites[] = new DiveSite($row);
            }
            parent::disconnect($conn);
            
            return $diveSites[0];
       }

       public function jsonSerialize() {
            return $this->data;
       }

        public function delete() {
            $conn = DataObject::connect();
            $sql = 'DELETE FROM ' . TBL_DIVE_SITE . " WHERE id = :diveSiteId";
        
            try {
                $st = $conn->prepare($sql);
                $st->bindValue(":diveSiteId", $this->getValue('id'));
                $st->execute();
            } catch(PDOException $e) {
                die("Query failed: " . $e->getMessage());
            }
        }



    }


?>
