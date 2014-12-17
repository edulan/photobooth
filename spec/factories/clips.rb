FactoryGirl.define do
  factory :clip do
    trait :with_snapshots do
      snapshot1 File.open("#{Rails.root}/spec/fixtures/files/test.png")
    end

    factory :clip_with_snapshots, traits: [:with_snapshots]
  end

end
