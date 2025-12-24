class CreateContents < ActiveRecord::Migration[8.1]
  def change
    create_table :contents do |t|
      t.string :title
      t.string :description
      t.text :text

      t.timestamps
    end
  end
end
